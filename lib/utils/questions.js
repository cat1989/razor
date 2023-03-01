module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: 'demo',
    },
    {
        type: 'list',
        name: 'framework',
        message: 'Choose a framework:',
        choices: [
            'vue2',
            'vue3',
            'react',
        ],
    },
]
