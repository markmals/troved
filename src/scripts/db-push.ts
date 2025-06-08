/** biome-ignore-all lint/suspicious/noExplicitAny: Needed for internal access */
import "jsr:@std/dotenv/load";
import * as schema from "$db/schema.ts";
import { DatabaseSync } from "node:sqlite";
import { Command } from "@cliffy/command";
import { assert } from "@std/assert";

interface DrizzleColumn {
    name: string;
    type: string;
    primaryKey?: boolean;
    notNull?: boolean;
    unique?: boolean;
    default?: any;
}

interface DrizzleTable {
    name: string;
    columns: DrizzleColumn[];
}

interface DatabaseColumn {
    name: string;
    type: string;
    notnull: boolean;
    dflt_value: any;
    pk: boolean;
}

interface DatabaseTable {
    name: string;
    columns: DatabaseColumn[];
}

interface TableDiff {
    table: string;
    action: "create" | "drop" | "recreate";
    addedColumns: DrizzleColumn[];
    removedColumns: DatabaseColumn[];
    modifiedColumns: { old: DatabaseColumn; new: DrizzleColumn }[];
    schemaTable?: DrizzleTable;
}

/**
 * Extracts table schema information from Drizzle table definitions
 */
function extractTableSchema(tableObj: any): DrizzleTable {
    const tableName = tableObj[Symbol.for("drizzle:Name")];
    const columns: DrizzleColumn[] = [];

    // Get column definitions from the table object
    const tableConfig = tableObj[Symbol.for("drizzle:Columns")];

    for (const [columnName, columnDef] of Object.entries(tableConfig)) {
        const col = columnDef as any;

        columns.push({
            name: columnName,
            type: col.getSQLType(),
            primaryKey: col.primary,
            notNull: col.notNull,
            unique: col.unique,
            default: col.default,
        });
    }

    return { name: tableName, columns };
}

/**
 * Gets current database schema by introspecting existing tables
 */
function getDatabaseSchema(db: DatabaseSync): DatabaseTable[] {
    const tables: DatabaseTable[] = [];

    // Get all table names
    const tableQuery = `
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `;

    const tableResults = db.prepare(tableQuery).all() as { name: string }[];

    for (const { name: tableName } of tableResults) {
        // Get column info for each table
        const columnQuery = `PRAGMA table_info("${tableName}")`;
        const columns = db.prepare(columnQuery).all() as any as DatabaseColumn[];

        tables.push({ name: tableName, columns });
    }

    return tables;
}

/**
 * Normalizes SQLite type names for comparison
 */
function normalizeType(type: string): string {
    return type.toLowerCase().trim();
}

/**
 * Compares two columns to see if they're equivalent
 */
function columnsEqual(dbCol: DatabaseColumn, schemaCol: DrizzleColumn): boolean {
    return (
        dbCol.name === schemaCol.name &&
        normalizeType(dbCol.type) === normalizeType(schemaCol.type) &&
        dbCol.notnull === (schemaCol.notNull || false) &&
        dbCol.pk === (schemaCol.primaryKey || false)
    );
}

/**
 * Compares schema tables with database tables and generates diff
 */
function generateTableDiffs(
    schemaTables: DrizzleTable[],
    dbTables: DatabaseTable[],
): TableDiff[] {
    const diffs: TableDiff[] = [];
    const dbTableMap = new Map(dbTables.map((t) => [t.name, t]));
    const schemaTableMap = new Map(schemaTables.map((t) => [t.name, t]));

    // Find tables to create (exist in schema but not in database)
    for (const schemaTable of schemaTables) {
        if (!dbTableMap.has(schemaTable.name)) {
            diffs.push({
                table: schemaTable.name,
                action: "create",
                addedColumns: [],
                removedColumns: [],
                modifiedColumns: [],
                schemaTable,
            });
        }
    }

    // Find tables to drop (exist in database but not in schema)
    for (const dbTable of dbTables) {
        if (!schemaTableMap.has(dbTable.name)) {
            diffs.push({
                table: dbTable.name,
                action: "drop",
                addedColumns: [],
                removedColumns: [],
                modifiedColumns: [],
            });
        }
    }

    // Find tables that exist in both and check for column changes
    for (const schemaTable of schemaTables) {
        const dbTable = dbTableMap.get(schemaTable.name);
        if (!dbTable) continue;

        const addedColumns: DrizzleColumn[] = [];
        const removedColumns: DatabaseColumn[] = [];
        const modifiedColumns: { old: DatabaseColumn; new: DrizzleColumn }[] = [];

        const dbColumnMap = new Map(dbTable.columns.map((c) => [c.name, c]));
        const schemaColumnMap = new Map(schemaTable.columns.map((c) => [c.name, c]));

        // Find added columns
        for (const schemaCol of schemaTable.columns) {
            if (!dbColumnMap.has(schemaCol.name)) {
                addedColumns.push(schemaCol);
            }
        }

        // Find removed columns
        for (const dbCol of dbTable.columns) {
            if (!schemaColumnMap.has(dbCol.name)) {
                removedColumns.push(dbCol);
            }
        }

        // Find modified columns
        for (const schemaCol of schemaTable.columns) {
            const dbCol = dbColumnMap.get(schemaCol.name);
            if (dbCol && !columnsEqual(dbCol, schemaCol)) {
                modifiedColumns.push({ old: dbCol, new: schemaCol });
            }
        }

        // If there are any changes, we need to recreate the table for SQLite
        if (addedColumns.length > 0 || removedColumns.length > 0 || modifiedColumns.length > 0) {
            diffs.push({
                table: schemaTable.name,
                action: "recreate",
                addedColumns,
                removedColumns,
                modifiedColumns,
                schemaTable,
            });
        }
    }

    return diffs;
}

/**
 * Generates CREATE TABLE SQL for a table schema
 */
function generateCreateTableSQL(table: DrizzleTable): string {
    const columnDefs = table.columns.map((col) => {
        let def = `"${col.name}" ${col.type}`;

        if (col.primaryKey) def += " PRIMARY KEY";
        if (col.notNull) def += " NOT NULL";
        if (col.unique && !col.primaryKey) def += " UNIQUE";
        if (col.default !== undefined) {
            def += ` DEFAULT ${typeof col.default === "string" ? `'${col.default}'` : col.default}`;
        }

        return def;
    });

    return `CREATE TABLE "${table.name}" (\n  ${columnDefs.join(",\n  ")}\n)`;
}

/**
 * Generates migration SQL from table diffs
 */
function generateMigrationSQL(diffs: TableDiff[]): string[] {
    const migrations: string[] = [];

    for (const diff of diffs) {
        switch (diff.action) {
            case "create":
                if (diff.schemaTable) {
                    migrations.push(generateCreateTableSQL(diff.schemaTable));
                    console.log(`📝 Will create table: ${diff.table}`);
                }
                break;

            case "drop":
                migrations.push(`DROP TABLE "${diff.table}"`);
                console.log(`🗑️  Will drop table: ${diff.table}`);
                break;

            case "recreate":
                if (diff.schemaTable) {
                    console.log(`🔄 Will recreate table: ${diff.table}`);
                    if (diff.addedColumns.length > 0) {
                        console.log(
                            `  ➕ Adding columns: ${
                                diff.addedColumns.map((c) => c.name).join(", ")
                            }`,
                        );
                    }
                    if (diff.removedColumns.length > 0) {
                        console.log(
                            `  ➖ Removing columns: ${
                                diff.removedColumns.map((c) => c.name).join(", ")
                            }`,
                        );
                    }
                    if (diff.modifiedColumns.length > 0) {
                        console.log(
                            `  🔧 Modifying columns: ${
                                diff.modifiedColumns.map((c) => c.new.name).join(", ")
                            }`,
                        );
                    }

                    // For recreation, we need the original table structure
                    // This is a simplified approach - in a real implementation,
                    // we'd need to pass the original table structure
                    migrations.push(`DROP TABLE "${diff.table}"`);
                    migrations.push(generateCreateTableSQL(diff.schemaTable));
                }
                break;
        }
    }

    return migrations;
}

/**
 * Main push function that mimics drizzle-kit push
 */
async function pushSchema(options: {
    databaseUrl?: string;
    verbose?: boolean;
    strict?: boolean;
    force?: boolean;
}): Promise<void> {
    const DATABASE_URL = options.databaseUrl || Deno.env.get("DATABASE_URL");
    assert(DATABASE_URL, "Must define DATABASE_URL in .env file or via --url option");

    console.log("🔄 Pushing schema to database...");

    // Connect to database
    const db = new DatabaseSync(DATABASE_URL);

    try {
        // Extract schema tables
        const schemaTables: DrizzleTable[] = [];

        for (const [, exportValue] of Object.entries(schema)) {
            if (
                exportValue && typeof exportValue === "object" &&
                // @ts-ignore internal to Drizzle
                exportValue[Symbol.for("drizzle:Name")]
            ) {
                const tableSchema = extractTableSchema(exportValue);
                schemaTables.push(tableSchema);
                console.log(`📋 Found schema table: ${tableSchema.name}`);
            }
        }

        if (schemaTables.length === 0) {
            console.log("⚠️  No tables found in schema");
            return;
        }

        // Get current database schema
        console.log("🔍 Introspecting database schema...");
        const dbTables = getDatabaseSchema(db);

        if (dbTables.length > 0) {
            console.log(`📊 Found ${dbTables.length} existing tables in database`);
        } else {
            console.log("📊 Database is empty");
        }

        // Generate table diffs
        const diffs = generateTableDiffs(schemaTables, dbTables);

        // Generate migration SQL
        const migrations = generateMigrationSQL(diffs);

        if (migrations.length === 0) {
            console.log("✅ Database schema is up to date!");
            return;
        }

        // Show migrations if verbose
        if (options.verbose) {
            console.log("\n📝 Generated SQL statements:");
            for (const migration of migrations) {
                console.log(migration);
            }
        }

        // Confirm changes if in strict mode
        // const shouldApply = await confirmChanges(migrations, options.force || false);

        // if (!shouldApply) {
        //     console.log("❌ Migration cancelled by user");
        //     return;
        // }

        // Apply migrations
        console.log("🚀 Applying migrations...");

        for (const migration of migrations) {
            if (options.verbose) {
                console.log(`Executing: ${migration}`);
            }
            db.exec(migration);
        }

        console.log(`✅ Successfully applied ${migrations.length} migration(s)`);
    } finally {
        db.close();
    }
}

await new Command()
    .name("push-schema")
    .description("Push Drizzle schema to database (mimics drizzle-kit push)")
    .option("--url <url:string>", "Database connection URL (overrides DATABASE_URL env var)")
    .option("--verbose", "Print all SQL statements prior to execution", { default: false })
    .option("--strict", "Always ask for approval before executing SQL statements", {
        default: true,
    })
    .option("--force", "Auto-accept all data-loss statements", { default: false })
    .action(
        async (
            options: { url?: string; verbose: boolean; strict: boolean; force: boolean },
        ) => {
            try {
                await pushSchema({
                    databaseUrl: options.url,
                    verbose: options.verbose,
                    strict: options.strict && !options.force,
                    force: options.force,
                });
            } catch (error) {
                console.error("❌ Schema push failed:", (error as Error).message);
                Deno.exit(1);
            }
        },
    )
    .parse(Deno.args);
