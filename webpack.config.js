const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const convert = require("koa-connect");
const historyApiFallback = require("connect-history-api-fallback");

// アドオンに historyApiFallback を追加
const addon = (app, middleware, option) => {
    app.use(convert(historyApiFallback()));
};

module.exports = {
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    entry: {
        main: path.resolve(__dirname, './src/', "index.js")
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/',
        filename: '[name]-[hash].js'
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ["style-loader", { loader: "css-loader", options: { modules: true } }]
            }]
    },
    devtool: 'source-map',
    serve: {
        open: true,
        port: 8080,
        content: path.resolve(__dirname, 'public'),
        add: addon
    },
    plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })]
}