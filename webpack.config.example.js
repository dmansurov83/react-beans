var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'web',
    entry: './example/src/index.js',
    output: {
        path: path.resolve(__dirname, 'build-example'),
        filename: 'index.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'example'), path.resolve(__dirname, 'src')],
                exclude: /(node_modules|build)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'example/public/index.html'
    })]
};
