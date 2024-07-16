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
    users_failed: chalk.red("User was not created"),
    users_length: chalk.red("Name value should not be less than 4 elements"),
    users_exist: chalk.red("User already exist"),
    users_created: chalk.green("User created successfully"),
    user_not_found: chalk.yellow("User not found"),
    users_failed_update: chalk.red("User was not updated"),
    users_deleted: chalk.green("User deleted"),
    user_updated: chalk.green("User updated"),
    
    // projects
    projects_failed: chalk.red("Project was not created"),
    projects_length: chalk.red("Title value should not be less than 4 elements Description Title value should not be less than 20 elements"),
    projects_exist: chalk.red("Project already exist"),
    projects_created: chalk.green("Project created successfully"),
    project_not_found: chalk.yellow("Project not found"),
    projects_failed_update: chalk.red("Project was not updated"),
    project_deleted: chalk.green("Project deleted"),
    project_updated: chalk.green("Project updated"),
})

const Logger = {
    Success,
    Error,
    Warning
}
module.exports = Logger