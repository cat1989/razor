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
    define: {
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    },
}
