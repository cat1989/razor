const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const autoprefixer = require('autoprefixer')
const fs = require('fs')
const DefinePlugin = require('webpack/lib/DefinePlugin')

const getTemplate = () => {
    return [
        path.resolve(process.cwd(), './index.html'),
        path.resolve(process.cwd(), './src/index.html'),
        path.resolve(__dirname, '../commands/create/templates/index.html'),
    ].find((template) => fs.existsSync(template))
}

const getBaseStyleLoaders = () => {
    const isProduction = process.env.NODE_ENV === 'production'
    const baseStyleLoaders = [
        isProduction ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                esModule: false,
            },
        },
    ]
    const cwd = process.cwd()
    const postcssConfig = path.resolve(cwd, './postcss.config.js')
    if (fs.existsSync(postcssConfig)) {
        baseStyleLoaders.push('postcss-loader')
    }
    else {
        baseStyleLoaders.push({
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    plugins: [
                        autoprefixer,
                    ],
                },
            },
        })
    }
    return baseStyleLoaders
}

const getBabelOptions = () => {
    const cwd = process.cwd()
    const configPath = path.resolve(cwd, './babel.config.js')
    if (fs.existsSync(configPath)) {
        return require(configPath)
    }
    else {
        return {
            presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@vue/babel-preset-jsx'),
            ],
        }
    }
}

const createWebpackConfig = (options = {}) => {
    const cwd = process.cwd()
    const {
        entry = path.resolve(cwd, './src'),
        output = { },
        resolve = { },
        plugins = [ ],
        rules = [ ],
        port = 'auto',
        proxy = { },
    } = options
    const isProduction = process.env.NODE_ENV === 'production'
    const template = getTemplate()
    const baseStyleLoaders = getBaseStyleLoaders()
    const config = {
        target: ['web', 'es5'],
        mode: process.env.NODE_ENV,
        entry,
        output: {
            path: output.path || path.resolve(cwd, './dist'),
            filename: 'bundle.js',
            chunkFilename: '[id].js',
        },
        resolve: {
            ...resolve,
            modules: [
                path.resolve(__dirname, '../../node_modules'),
                path.resolve(cwd, './node_modules'),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: getBabelOptions(),
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: require.resolve('ts-loader'),
                },
                {
                    test: /\.vue$/,
                    use: 'vue-loader',
                },
                {
                    test: /\.css$/,
                    use: baseStyleLoaders,
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        ...baseStyleLoaders,
                        require.resolve('sass-loader'),
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        ...baseStyleLoaders,
                        require.resolve('less-loader'),
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: [
                        {
                            loader: require.resolve('url-loader'),
                            options: {
                                esModule: false,
                                limit: 1024 * 1024 * 1,
                                name: isProduction ? 'assets/images/[contenthash].[ext]' : '[path]/[name].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(aot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: require.resolve('file-loader'),
                            options: {
                                esModule: false,
                                name: isProduction ? 'assets/fonts/[contenthash].[ext]' : '[path]/[name].[ext]',
                            },
                        },
                    ],
                },
                ...rules,
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template,
                filename: 'index.html',
            }),
            ...plugins,
        ],
    }
    if (options.define) {
        config.plugins.push(
            new DefinePlugin(options.define)
        )
    }
    if (isProduction) {
        config.output = {
            ...config.output,
            filename: 'scripts/[contenthash].js',
            chunkFilename: 'scripts/[contenthash].js',
            clean: true,
            publicPath: 'auto',
        }
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'styles/[contenthash].css',
                chunkFilename: 'styles/[contenthash].css',
            }),
        )
        config.optimization = {
            minimize: true,
            minimizer: [
                new CssMinimizerWebpackPlugin(),
                new TerserWebpackPlugin({
                    extractComments: false,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
        }
    }
    else {
        config.devtool = 'eval-cheap-module-source-map'
        config.devServer = {
            host: '0.0.0.0',
            port,
            hot: true,
            proxy,
        }
    }
    return config
}

module.exports = createWebpackConfig
