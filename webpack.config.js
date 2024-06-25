const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        admin: './src/admin.js',
        frontend: './src/frontend.js',
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name].js',
    },
    mode: 'development', // Vaihda tuotantoympäristöstä kehitysympäristöön
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "process": require.resolve("process/browser")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // Vaihda tuotantoympäristöstä kehitysympäristöön
        })
    ]
};
