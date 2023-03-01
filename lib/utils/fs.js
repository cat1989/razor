const fs = require('fs')
const path = require('path')

const copyDirSync = (src, dest) => {
    if (fs.existsSync(src)) {
        !fs.existsSync(dest) && fs.mkdirSync(dest)
        function _copy(src, dest) {
            fs.readdirSync(src, {
                withFileTypes: true,
            }).map((dir) => {
                const srcName = path.resolve(src, `./${dir.name}`)
                const destName = path.resolve(dest, `./${dir.name}`)
                if (dir.isDirectory()) {
                    if (!fs.existsSync(destName)) {
                        fs.mkdirSync(destName)
                    }
                    _copy(srcName, destName)
                }
                else {
                    if (!fs.existsSync(destName)) {
                        fs.copyFileSync(srcName, destName)
                    }
                }
            })
        }
        _copy(src, dest)
    }
}

module.exports = {
    copyDirSync,
}
