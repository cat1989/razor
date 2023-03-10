#!/usr/bin/env node
const path = require('path')
const fs = require('fs')

let [
    ,,command = "help"
] = process.argv
if ([
    '-v',
    '--version',
].includes(command)) {
    command = 'version'
}

if (![
    'version',
    'create',
    'dev',
    'build',
    'help',
].includes(command)) {
    process.exit()
}

const configPath = path.resolve(process.cwd(), './razor.config.js')
const context = {
    encoding: 'utf-8',
    configPath,
    getConfig() {
        if (fs.existsSync(configPath)) {
            return require(configPath)
        }
        else {
            return {}
        }
    },
}

require(`../lib/commands/${command}`)(context)
