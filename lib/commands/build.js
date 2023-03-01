const webpack = require('webpack')
const createWebpackConfig = require('../utils/webpack')
const path = require('path')
const fs = require('fs')

module.exports = () => {
    const cwd = process.cwd()
    process.env.NODE_ENV = 'production'
    let configJson = {}
    const configPath = path.resolve(cwd, './razor.config.js')
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
    const compiler = webpack(config)
    compiler.run((err, stats) => {
        // console.log(stats)
    })
}
