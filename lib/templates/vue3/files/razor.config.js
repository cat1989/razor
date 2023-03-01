const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    resolve: {
        extensions: [
            ".vue", ".jsx", ".js",
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}
