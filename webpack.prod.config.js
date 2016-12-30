process.env.NODE_ENV = 'production';
var path = require('path'),
    precss = require('precss'),
    cssnext = require('cssnext'),
    cssnano = require('cssnano'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    //定义地址
    ROOT_PATH = path.resolve(__dirname),
    APP_PATH = path.resolve(ROOT_PATH, 'src'),
    APP_FILE = path.resolve(APP_PATH, 'index'),
    NODE_PATH = path.resolve(ROOT_PATH, 'node_modules'),
    DIST_PATH = path.resolve(ROOT_PATH, 'dist');

var webapckConfig = {
    devtool: 'source-map',
    entry: {
        index: ['babel-polyfill', APP_FILE],
        vendors: ['babel-polyfill', 'react', 'react-dom', 'react-router', 'redux', 'react-redux'],
    },
    output: {
        path: DIST_PATH,
        publicPath: "/demo/dist/",
        filename: "js/[name].min.js",
        chunkFilename: "js/[name].[chunkhash:5].min.js"
    },
    resolve: {
        root: 'E:/demo',
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.less'],
        alias: {
            'css': path.resolve(__dirname, './src/css'),
            'img': path.resolve(__dirname, './images')
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
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.(scss|sass|css)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        }, {
            test: /\.(ico|png|jpg|jpeg|gif)$/,
            loader: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|svgz)(\?.*$|$)/,
            loader: 'url?importLoaders=1&limit=25000&name=fonts/[name].[ext]'
        }]
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                ]
            }), cssnext, precss, cssnano
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin("js/common.min.js"),
        new webpack.ProvidePlugin({
            'React': 'react',
            $: 'jquery'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.UglifyJsPlugin({
            exclude: /\.min\.js($|\?)/i,
            output: {
                screw_ie8: true,
                comments: false
            },
            compress: {
                screw_ie8: true,
                warnings: true
            },
            sourceMap: true,
            mangle: {
                screw_ie8: true
            },
            except: ['$super', '$', 'exports', 'require']
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            favicon: './src/Template/favicon.ico',
            template: './src/Template/index.html',
            filename: '/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

module.exports = webapckConfig;