const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const questions = require('./questions')
const {
    copyDirSync,
} = require('../../utils/fs')

module.exports = ({
    encoding,
}) => {
    inquirer.prompt(questions).then(({
        name,
        framework,
    }) => {
        const cwd = process.cwd()
        const root = path.resolve(cwd, `./${name}`)
        !fs.existsSync(root) && fs.mkdirSync(root)
        const dependencies = require(`./templates/${framework}/dependencies`)
        Object.keys(dependencies).map((key) => {
            if (Object.keys(dependencies[key]).length === 0) {
                delete(dependencies[key])
            }
        })
        const packageJson = {
            name,
            version: '1.0.0',
            description: '',
            main: 'index.js',
            scripts: {
                dev: 'razor dev',
                build: 'razor build',
            },
            keywords: [],
            author: '',
            license: 'ISC',
            ...dependencies,
        }
        fs.writeFileSync(path.resolve(root, `./package.json`), JSON.stringify(packageJson, "\n", "  "), {
            encoding,
        })
        copyDirSync(path.resolve(__dirname, `./templates/${framework}/files`), root)
        console.log('Creating a new project.')
    })
}
