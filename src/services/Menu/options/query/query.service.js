const TASKS = require("../../../../singleton/tasks.singleton");
const backUtil = require("../../../../utils/back");
const TableUtil = require("../../../../utils/table");
const timestamp2FullDate = require("../../../../utils/timestamp2FullDate");

function userQuery(props) {
    const {config, back, ended} = props
    const tasksOfUser = TASKS.getByUser(config)
    tasksOfUser.map(task => {
        const fullDate = timestamp2FullDate(task.Deadline)
        task.Deadline = fullDate
    })
    TableUtil(tasksOfUser)
    ended()
}

function projectQuery(props) {
    const {config, back, ended} = props
    const tasksOfProject = TASKS.getByProject(config)
    tasksOfProject.map(task => {
        const fullDate = timestamp2FullDate(task.Deadline)
        task.Deadline = fullDate
    })
    TableUtil(tasksOfProject)
    ended()
}

module.exports = {
    back: backUtil,
    userQuery,
    projectQuery
}