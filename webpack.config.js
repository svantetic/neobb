/*
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/frontend/css/app.css',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: [
                            require('tailwindcss'),
                            require('autoprefixer'),
                          ],
                        },
                      },
                  ],
            }
        ]
    },
    output: {
        filename: 'app.css',
        path: path.resolve(__dirname, 'public/css'),
    }
}
*/