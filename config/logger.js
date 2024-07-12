const chalk = require("chalk");

function Success(type) {
    return console.log(chalk.green(messages[type]))
}

function Error(type) {
    return console.log(chalk.red(messages[type]))
}

function Warning(type) {
    return console.log(chalk.red(messages[type]))
}

const messages =  Object.freeze({
    // users
    users_created: chalk.green("User created successfully"),
    users_failed: chalk.red("User was not created"),
    users_failed_update: chalk.red("User was not updated"),
    users_length: chalk.red("Name value should not be less than 4 elements"),
    users_exist: chalk.red("User already exist"),
    users_deleted: chalk.green("User deleted"),
    user_not_found: chalk.yellow("User not found"),
})

const Logger = {
    Success,
    Error,
    Warning
}
module.exports = Logger