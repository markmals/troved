import oxc from "oxc-transform";
import { execa } from "execa";
import fs from "node:fs/promises";

// Run the react-router build command
await execa("npx", ["react-router", "build"], {
    env: { NODE_ENV: "production" },
});

// Generate TypeScript declaration file
const serverEntry = await fs.readFile("./src/server/index.ts", "utf-8");
const { code, errors } = oxc.isolatedDeclaration("index.ts", serverEntry);

if (errors.length > 0) {
    throw new Error(`Failed to generate declaration file: ${JSON.stringify(errors)}`);
}

await fs.writeFile("./build/server/index.d.ts", code);
