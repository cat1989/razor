const webpack = require('webpack')
const createWebpackConfig = require('../../utils/webpack')

module.exports = ({
    getConfig,
}) => {
    process.env.NODE_ENV = 'production'
    const config = createWebpackConfig(getConfig())
    const compiler = webpack(config)
    compiler.run((err, stats) => {
        // console.log(stats)
    })
}
