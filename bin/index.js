#!/usr/bin/env node
let [
    ,,command = "create"
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
].includes(command)) {
    process.exit()
}

require(`../lib/commands/${command}`)()
