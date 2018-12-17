const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (template) {
    let config = {
        entry: path.join(__dirname, '../public/js/entry.js'),
        output: {
            path: path.join(__dirname, '../tmp/'),
            filename: 'resource.js'
        },
        mode: 'development',
        // node: {
        // //     fs: "empty"
        // },
        module: {
            rules: [
                {
                    test: /\.html?$/,
                    use: [
                        {
                            loader: "html-url-loader",
                            options: {
                                query: { deep: true }
                            }
                        }
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 9999999999,
                        // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                // filename: config.build.index,
                template: template,
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    // removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency',
                inlineSource: '.(js|css)$'
            }),
            new HtmlWebpackInlineSourcePlugin(),
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: false,
                cache: path.join(__dirname, '../tmp'),
                extractComments: 'none'
            })
        ]
    };
    return config;
};
