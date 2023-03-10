const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const createWebpackConfig = require('../../utils/webpack')
const { exec } = require('child_process')

module.exports = ({
    getConfig,
}) => {
    process.env.NODE_ENV = 'development'
    const config = createWebpackConfig(getConfig())
    const server = new WebpackDevServer({
        ...config.devServer,
        // open: true,
    }, webpack(config))
    server.startCallback(() => {
        exec(`start http://localhost:${server.options.port}`)
    })
}
