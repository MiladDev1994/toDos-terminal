const { writeFileSync } = require("fs")
const path = require("path")
const { savePathChecker, excelStructure } = require("./export.service");
const USERS = require("../../../../singleton/users.singleton");
const PROJECTS = require("../../../../singleton/projects.singleton");
const TASKS = require("../../../../singleton/tasks.singleton");
const Logger = require("../../../../../config/logger");

async function json(props) {
    const {directory, back, ended} = props
    const users = USERS.getAll()
    const projects = PROJECTS.getAll()
    const tasks = TASKS.getAll()
    const savePath = await savePathChecker(directory)
    writeFileSync(path.join(savePath, `todos.json`), JSON.stringify({users, projects, tasks}, null, 4))
    Logger.Success("app_saved")
    back()
}

async function excel(props) {
    const {directory, back, ended} = props
    const savePath = await savePathChecker(directory)
    await excelStructure(savePath)
    Logger.Success("app_saved")
    back() 
}

module.exports = {
    json,
    excel
}