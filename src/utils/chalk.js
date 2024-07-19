const chalk = require("chalk")

function input(message) {
    return chalk.gray(message)
}

function confirm(message) {
    return chalk.yellow(message)
}

const Chalk = {
    input,
    confirm
}

module.exports = Chalk