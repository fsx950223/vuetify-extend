'use strict';

const path = require('path');

module.exports = {
    entry: './index.js',
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.{vue|ts}$/,
                loader:'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    fix:true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.vue', '.json']
    },
    devtool: 'source-map'
};
