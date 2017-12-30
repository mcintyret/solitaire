const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Module loaders for .less files, used in reverse order (compile Less, apply PostCSS, interpret CSS as modules)
const lessLoaders = [
    require.resolve("style-loader"),
    {
        loader: require.resolve("css-loader"),
        options: { minimize: IS_PRODUCTION },
    },
    require.resolve("less-loader"),
];

const config = {
    entry: {
        app: [
            path.resolve(__dirname, "src/app.tsx"),
            path.resolve(__dirname, "src/app.less"),
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build/solitaire"),
    },
    devtool: IS_PRODUCTION ? false : "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: require.resolve("awesome-typescript-loader"),
                    options: {
                        configFileName: "./tsconfig.json",
                    },
                },
            },
            {
                test: /\.less$/,
                use:  lessLoaders,
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.ts', '.tsx']
    },
    plugins: IS_PRODUCTION ? [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true,
        }),
        // new UglifyJsPlugin({
        //     parallel: true
        // }),
    ] : []
};

module.exports = config;
