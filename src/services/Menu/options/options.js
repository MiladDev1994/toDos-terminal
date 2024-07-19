const {existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync} = require("fs")
const path = require("path")
const inquirer = require('inquirer');
const backUtil = require("../../../utils/back");
const findKey = require('../../../utils/findKey');
const option = require("./option/option")
const exportMenu = require("./option/export/export");
const USERS = require("../../../singleton/users.singleton");
const PROJECTS = require("../../../singleton/projects.singleton");
const TASKS = require("../../../singleton/tasks.singleton");
const importType = require("./option/import/import.service")


function query_by(props) {
    const {config, back, ended} = props
    inquirer.prompt(config.prompt())
    .then( async (answers) => {
        const {Query} = answers
        const {list} = config
        const res = findKey(list, Query)
        option[res]({
            config: list[res].child,
            back: ended,
            ended: () => query_by(props)
        })
    })
}

function import_data(props) {
    const {config, back, ended} = props
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {directory} = answers
        const readDir = readdirSync(directory)
        const filesType = ["todos.json", "todos.xlsx"]
        if (!readDir.length || !readDir.some(ele => filesType.includes(ele))) {
            console.log("File not found")
            return back()
        }
        readDir.forEach( async (file) => {
            if (filesType.includes(file)) {
                const mimetype = file.split(".").pop()
                const filePath = path.join(directory, file)
                const {users, projects, tasks} = await importType[mimetype](filePath)
                if (users.length) USERS.set(users)
                if (projects.length) PROJECTS.set(projects)
                if (tasks.length) TASKS.set(tasks)
                return back()
            }
        })
        // console.log(readDir);
    })
}

function export_data(props) {
    const {config, back, ended} = props
    inquirer.prompt(config.prompt())
    .then( async (answers) => {
        const {type, directory} = answers
        const {list} = config
        const res = findKey(list, type)
        exportMenu[res]({
            directory: directory,
            back: ended,
            ended: () => export_data(props)
        })
    })
}


module.exports = {
    back: backUtil,
    query_by,
    import_data,
    export_data
}