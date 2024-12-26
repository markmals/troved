import babel from "vite-plugin-babel"

export function reactCompiler() {
    const ReactCompilerConfig = {
        target: "19",
    }

    return babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
            presets: ["@babel/preset-typescript"],
            plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
    })
}
