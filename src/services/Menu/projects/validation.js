const chalk = require("chalk")

module.exports = function userNameValidation(name) {
    if (
        !name.trim() ||
        name.length < 4
    ) return {
        status: false,
        message: chalk.red("Name value should not be empty and less than 4 elements")
    }
    return {status: true}
}