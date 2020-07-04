const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        client: './src/frontend/js/index.ts',
        admin: './src/frontend/js/admin/index.ts',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.frontend.json',
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',  
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    watch: true,
    watchOptions: {
        poll: 1000,
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
          },
          
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/public/js',
        filename: '[name].bundle.js',
    },
}