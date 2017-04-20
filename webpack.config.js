var fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    //定义地址
    ROOT_PATH = path.resolve(__dirname),
    APP_PATH = path.resolve(ROOT_PATH, 'src'),
    APP_FILE = path.resolve(APP_PATH, 'index'),
    NODE_PATH = path.resolve(ROOT_PATH, 'node_modules'),
    BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var webapckConfig = {
    cache: true,
    debug: true,
    devtool: "cheap-module-source-map",
    entry: {
        index: ['babel-polyfill', 'stack-source-map/register', APP_FILE],
        vendors: ['babel-polyfill', 'react', 'react-dom', 'react-router', 'redux', 'react-redux']
    },
    output: {
        path: BUILD_PATH,
        publicPath: "/",
        filename: "js/[name].min.js",
        chunkFilename: "js/[name].[chunkhash:5].min.js"
    },
    resolve: {
        // root: 'E:/demo',
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.less'],
        alias: {
            'src': APP_PATH,
            'css': path.resolve(__dirname, './src/styles'),
            'img': path.resolve(__dirname, './src/images')
        }
    },
    module: {
        loaders: [{
            'loader': 'babel-loader',
            test: /[\.jsx|\.js ]$/,
            include: [APP_PATH],
            exclude: [NODE_PATH],
            query: {
                plugins: ['transform-runtime'],
                presets: ['react-hmre', 'es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.less$/,
            loader: 'style!css!less?sourceMap'
        }, {
            test: /\.(scss|sass)$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.(ico|png|jpg|jpeg|gif)$/,
            loader: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|svgz)(\?.*$|$)/,
            loader: 'url?importLoaders=1&limit=25000&name=fonts/[name].[ext]'
        }]
    },
    plugins: [
        new CommonsChunkPlugin("js/common.min.js"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new OpenBrowserPlugin({
            url: 'http://localhost:9999'
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            $: 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
        new HtmlWebpackPlugin({
            favicon: './src/Template/favicon.ico',
            template: './src/Template/index.html',
            filename: '/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        })
    ],
    devServer: {
        hot: true,
        inline: true,
        progress: true,
        contentBase: './build',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true
    }
};

module.exports = webapckConfig;