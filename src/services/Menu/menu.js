
const inquirer = require('inquirer');
const findKey = require('../../utils/findKey');
const usersMenu = require("./users/users")
const projectsMenu = require("./projects/projects")
const tasksMenu = require("./tasks/tasks")
const actionsMenu = require("./options/options")

function users(props) {
    const {config, back} = props
    const {list} = config
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {Users} = answers
        const res = findKey(list, Users)
        usersMenu[res]({
            config: list[res].child,
            back,
            ended: () => users(props)
        })
    });
}

function projects(props) {
    const {config, back} = props
    const {list} = config
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {Project} = answers
        const res = findKey(list, Project)
        projectsMenu[res]({
            config: list[res].child,
            back,
            ended: () => projects(props)
        })
    });
}

function tasks(props) {
    const {config, back} = props
    const {list} = config
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {Tasks} = answers
        const res = findKey(list, Tasks)
        tasksMenu[res]({
            config: list[res].child,
            back,
            ended: () => tasks(props)
        })
    });
}

function options(props) {
    const {config, back} = props
    const {list} = config
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {Options} = answers
        const res = findKey(list, Options)
        actionsMenu[res]({
            config: list[res].child,
            back,
            ended: () => options(props)
        })
    });
}


module.exports = {
    users,
    projects,
    tasks,
    options
}