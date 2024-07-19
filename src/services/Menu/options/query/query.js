const inquirer = require('inquirer');
const backUtil = require("../../../../utils/back");
const USERS = require('../../../../singleton/users.singleton');
const findKey = require('../../../../utils/findKey');
const service = require("./query.service");
const PROJECTS = require('../../../../singleton/projects.singleton');
const Logger = require('../../../../../config/logger');

function user(props) {
    const {config, back, ended} = props
    const users = USERS.getAll()

    if (!users.length) {
        Logger.Warning("user_not_found")
        return ended()
    } 
    const usersArray = []
    const usersObject = {}
    users.forEach(user => {
        usersArray.push(user.name)
        usersObject[user.name] = user.name
    })
    const list = {
        ...config.list,
        ...usersObject
    }
    const prompt = {
        ...config.prompt(),
        choices: [
            ...config.prompt().choices,
            ...usersArray
        ]
    }

    inquirer.prompt(prompt)
    .then( async (answers) => {
        const {User} = answers
        let res = ""
        if (findKey(list, User) === "back") res = "back"
        else res = "userQuery"
        service[res]({
            config: User,
            back: ended,
            ended: () => user(props),
        })
    })
}

function project(props) {
    const {config, back, ended} = props
    const projects = PROJECTS.getAll()

    if (!projects.length) {
        Logger.Warning("project_not_found")
        return ended()
    } 

    const projectsArray = []
    const projectsObject = {}
    projects.forEach(project => {
        projectsArray.push(project.title)
        projectsObject[project.title] = project.title
    })
    const list = {
        ...config.list,
        ...projectsObject
    }
    const prompt = {
        ...config.prompt(),
        choices: [
            ...config.prompt().choices,
            ...projectsArray
        ]
    }

    inquirer.prompt(prompt)
    .then( async (answers) => {
        const {Project} = answers
        let res = ""
        if (findKey(list, Project) === "back") res = "back"
        else res = "projectQuery"
        service[res]({
            config: Project,
            back: ended,
            ended: () => project(props),
        })
    })
}

module.exports = {
    back: backUtil,
    user,
    project
}