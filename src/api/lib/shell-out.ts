// A tiny, batteries-included helper that makes it trivial to “shell out”
// from a Deno script, with nice error handling and a handful of convenient,
// pre-defined commands inspired by John Sundell’s Swift version.
//
// ───────────────────────────────────────────────────────────────────────────
// ✨ Quick start
//    import { shellOut, cmd } from "$api/lib/shell-out.ts";
//
//    const greeting = await shellOut("echo", ["Hello world"]);
//    console.log(greeting);     // →  Hello world
//
//    await shellOut([
//      "mkdir -p NewFolder",
//      `echo "Hello again" > NewFolder/file.txt`,
//    ], { at: "~/CurrentFolder" });
//
// ───────────────────────────────────────────────────────────────────────────
//
// ⚠️  Requires the --allow-run permission (and                ⌄
//     --allow-read/--allow-write if your commands need it).
//     deno run --allow-run your_script.ts
//

// ───────────────────────────────────────────────────────────────────────────
// 📚 Examples
// ───────────────────────────────────────────────────────────────────────────

// Asynchronous
// await shellOut(...cmd.gitInit());
// await shellOut(...cmd.createFolder("dist"));
// const listing = await shellOut("ls", ["-la"]);

// Synchronous
// shellOutSync(...cmd.gitCommit("Automated commit"), { at: "./repo" });

// Reading command output + rich errors
/*
try {
  const result = await shellOut("git", ["rev-parse", "--short", "HEAD"]);
  console.log("Current commit:", result);
} catch (err) {
  if (err instanceof ShellOutError) {
    console.error("🔴 Command failed:", err.stderr);
  } else throw err;
}
*/

// ───────────────────────────────────────────────────────────────────────────
// ⚙️ Internals
// ───────────────────────────────────────────────────────────────────────────

/**
 * A typed error that captures the exit code, stdout and stderr of the
 * underlying process — mirroring the ergonomics of ShellOutError in Swift.
 */
export class ShellOutError extends Error {
    constructor(
        public override readonly message: string,
        public readonly code: number,
        public readonly stdout: string,
        public readonly stderr: string,
    ) {
        super(message);
    }
}

/**
 * Options shared by the async/sync helpers.
 */
interface ShellOutOptions {
    /** Run the command(s) at this (optionally ~-expanded) directory. */
    at?: string;
    /** Environment variables to pass through / override. */
    env?: Record<string, string>;
}

const CWD = /^~\//;

/**
 * Low-level runner around `Deno.Command`.
 */
async function run(
    bin: string,
    args: string[],
    opts: ShellOutOptions = {},
): Promise<string> {
    const cwd = opts.at
        ? Deno.realPathSync(opts.at.replace(CWD, `${Deno.env.get("HOME")}/`))
        : undefined;

    const { code, stdout, stderr } = await new Deno.Command(bin, {
        args,
        cwd,
        env: opts.env,
        stdout: "piped",
        stderr: "piped",
    }).output();

    const out = new TextDecoder().decode(stdout);
    if (code === 0) return out.trimEnd();

    const err = new TextDecoder().decode(stderr);
    throw new ShellOutError(err.trimEnd() || `Command \`${bin}\` failed`, code, out, err);
}

/**
 * Run a single command (with optional arguments) *or* an array of raw
 * strings (which are executed via “sh -c” one by one).
 *
 * Examples:
 *   await shellOut("echo", ["hello"]);
 *   await shellOut(["git init", "git add .", "git commit -m initial"]);
 */
export async function shellOut(
    cmdOrCmds: string | string[],
    args: string[] = [],
    opts: ShellOutOptions = {},
): Promise<string> {
    if (Array.isArray(cmdOrCmds)) {
        for (const statement of cmdOrCmds) {
            await shellOut("sh", ["-c", statement], opts);
        }
        return "";
    }
    return run(cmdOrCmds, args, opts);
}

/**
 * Synchronous counterpart (mostly useful for short scripts / tooling).
 */
export function shellOutSync(
    cmdOrCmds: string | string[],
    args: string[] = [],
    opts: ShellOutOptions = {},
): string {
    if (Array.isArray(cmdOrCmds)) {
        for (const statement of cmdOrCmds) {
            shellOutSync("sh", ["-c", statement], opts);
        }
        return "";
    }

    const cwd = opts.at
        ? Deno.realPathSync(opts.at.replace(CWD, `${Deno.env.get("HOME")}/`))
        : undefined;

    const { code, stdout, stderr } = new Deno.Command(cmdOrCmds, {
        args,
        cwd,
        env: opts.env,
        stdout: "piped",
        stderr: "piped",
    }).outputSync();

    const out = new TextDecoder().decode(stdout);
    if (code === 0) return out.trimEnd();

    const err = new TextDecoder().decode(stderr);
    throw new ShellOutError(err.trimEnd() || `Command \`${cmdOrCmds}\` failed`, code, out, err);
}

// ───────────────────────────────────────────────────────────────────────────
// 🪄 Pre-defined commands
// ───────────────────────────────────────────────────────────────────────────

/**
 * A tiny DSL for building “pre-defined commands”.
 * Each helper returns `[bin, ...args]` so it can be splatted into either
 * `shellOut(cmd(...))` **or** `shellOutSync(cmd(...))`.
 */
export namespace cmd {
    // ——— Git ————————————————————————————————————————————
    export const gitInit = () => ["git", "init"] as const;
    export const gitClone = (url: string, dir?: string) =>
        ["git", "clone", url, ...(dir ? [dir] : [])] as const;
    export const gitCommit = (msg: string) => ["git", "commit", "-m", msg] as const;
    export const gitPush = (remote = "origin", branch = "main") =>
        ["git", "push", remote, branch] as const;
    export const gitPull = (remote = "origin", branch = "main") =>
        ["git", "pull", remote, branch] as const;
    export const gitCheckout = (branch: string) => ["git", "checkout", branch] as const;
    export const gitSubmoduleUpdate = () =>
        ["git", "submodule", "update", "--init", "--recursive"] as const;

    // ——— File system ——————————————————————————————————
    export const createFolder = (name: string) => ["mkdir", "-p", name] as const;
    export const createFile = (name: string, contents = "") =>
        ["sh", "-c", `echo ${JSON.stringify(contents)} > ${name}`] as const;
    export const copyFile = (from: string, to: string) => ["cp", from, to] as const;
    export const moveFile = (from: string, to: string) => ["mv", from, to] as const;
    export const removeFile = (path: string) => ["rm", "-rf", path] as const;
    export const readFile = (path: string) => ["cat", path] as const;
    export const openFile = (path: string) => ["xdg-open", path] as const; // macOS: "open"
    export const createSymlink = (target: string, link: string) =>
        ["ln", "-sfn", target, link] as const;
    export const expandSymlink = (link: string) => ["readlink", "-f", link] as const;

    // ——— Deno ecosystem helpers ——————————————————————
    export const denoTask = (name: string, ...taskArgs: string[]) =>
        ["deno", "task", name, ...taskArgs] as const;

    // Extend with your own helpers: export const myCmd = () => [...]
}
