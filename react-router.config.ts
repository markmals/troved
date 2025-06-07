import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
    appDirectory: "src/app",
    future: {
        unstable_viteEnvironmentApi: true,
        unstable_middleware: true,
    },
} satisfies Config;
