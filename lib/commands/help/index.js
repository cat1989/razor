const help = `Synopsis

    razor command [options]

Global Commands
    create ............................. Create a project
    help ............................... Get help

Project Commands
    build .............................. Build app
    dev ................................ Run project with a local webserver

Options
    -v, --version ...................... prints out this utility's version

Examples
    razor create
    razor build
    razor dev

`

module.exports = () => {
    console.log(help)
}
