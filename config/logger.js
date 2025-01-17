const chalk = require("chalk");

function Success(type) {
    return console.log(chalk.green(messages[type]))
}

function Error(type) {
    return console.log(chalk.red(messages[type]))
}

function Warning(type) {
    return console.log(chalk.yellow(messages[type]))
}

function Table(table) {
    return console.log(table.toString())
}

const messages =  Object.freeze({
    // users
    users_failed: "User was not created",
    users_length: "Name value should not be less than 4 elements",
    users_exist: "User already exist",
    users_created: "User created successfully",
    user_not_found: "User not found",
    users_failed_update: "User was not updated",
    users_deleted: "User deleted",
    user_updated: "User updated",
    user_dependencies: "If the user is deleted, all dependencies will be deleted",
    // projects
    projects_failed: "Project was not created",
    projects_length: "Title value should not be less than 4 elements Description Title value should not be less than 20 elements",
    projects_exist: "Project already exist",
    projects_created: "Project created successfully",
    project_not_found: "Project not found",
    projects_failed_update: "Project was not updated",
    project_deleted: "Project deleted",
    project_updated: "Project updated",
    project_dependencies: "If the project is deleted, all dependencies will be deleted",
    // tasks
    task_failed: "Task was not created",
    task_length: "Title value should not be less than 4 elements Description Title value should not be less than 20 elements",
    task_exist: "Task already exist",
    task_created: "Task created successfully",
    task_not_found: "Task not found",
    task_failed_update: "Task was not updated",
    task_deleted: "Task deleted",
    task_updated: "Task updated",
    // public
    record_not_exist: "Record not exist",
    app_saved: "App saved successfully",
    file_imported: "File imported successfully",
    file_not_found: "File not found",
})

const Logger = {
    Success,
    Error,
    Warning,
    Table,
}
module.exports = Logger