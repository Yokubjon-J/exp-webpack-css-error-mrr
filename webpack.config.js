const path = require("path");
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIR = process.cwd();

let isDevelopment = process.env.NODE_ENV === "development";

const config = {
    name: "server",
    mode: "development",
    entry: '/server.js',
    target: "node",
    // watch: true, //dangerous!
    resolve: {
        extensions: ['.css', '.js', '.jsx']
    },
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: "index.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2",
        clean: true,
    },
    externals: [nodeExternals({
        allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
    })],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
}
module.exports = config;
