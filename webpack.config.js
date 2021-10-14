const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react', 'react-dom'
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'src/index.html'
        })
    ]
};