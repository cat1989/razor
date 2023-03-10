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
            'vue2.6',
            'vue2.7',
            'vue3',
            'vue3+ts',
            'react+ts',
        ],
    },
]
