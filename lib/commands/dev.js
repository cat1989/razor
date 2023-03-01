const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const createWebpackConfig = require('../utils/webpack')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

module.exports = () => {
    const cwd = process.cwd()
    process.env.NODE_ENV = 'development'
    const configPath = path.resolve(cwd, './razor.config.js')
    let configJson = {}
    if (fs.existsSync(configPath)) {
        configJson = require(configPath)
    }
    const {
        resolve = {},
        plugins = [],
    } = configJson
    const config = createWebpackConfig({
        resolve,
        plugins,
    })
    const server = new WebpackDevServer({
        ...config.devServer,
        // open: true,
    }, webpack(config))
    server.startCallback(() => {
        exec(`start http://localhost:${server.options.port}`)
    })
}
