const path = require("path");
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CURRENT_WORKING_DIR = process.cwd();
const nodeExternals = require('webpack-node-externals');

let isDevelopment = process.env.NODE_ENV === "development";
console.log(path.join(CURRENT_WORKING_DIR, '/dist/'))
const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    entry: "./public/main.js",
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: 'bundle.js',
        publicPath: '/dist/',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),                        
                    },
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
}
module.exports = () => {
    isDevelopment = process.env.NODE_ENV === "development";
    return config
};