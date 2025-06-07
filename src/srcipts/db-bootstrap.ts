// import "jsr:@std/dotenv/load";
import { assert } from "@std/assert";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
assert(DATABASE_URL, "Must define DATABASE_URL in .env file");

try {
    // Remove existing database file if it exists
    await Deno.remove(DATABASE_URL).catch(() => {});

    // Create new empty database file
    await Deno.writeTextFile(DATABASE_URL, "");

    console.log("Database bootstrapped successfully");
} catch (error) {
    console.error("Error bootstrapping database:", error);
    process.exit(1);
}
