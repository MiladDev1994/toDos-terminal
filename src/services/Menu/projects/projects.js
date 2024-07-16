const inquirer = require('inquirer');
const backUtil = require("../../../utils/back")
const userNameValidation = require("./validation");
const Logger = require("../../../../config/logger");
const projectAction = require("./project/project")
const findKey = require('../../../utils/findKey');
const PROJECTS = require('../../../singleton/projects.singleton');


async function add_project(props) {
    const {config, ended} = props
    
    inquirer.prompt(config.prompt())
    .then( async (answers) => {
        const {title, description} = answers
        if (!title || !description) {
            Logger.Error("projects_failed")
            ended()
        } else if (title.length < 4 || description.length < 20) {
            Logger.Error("projects_length")
            add_project(props)
        } else {
            await PROJECTS.create(answers)
            ended()
        }
    })
    
}

async function projects_list(props) {
    const {config, ended} = props
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
        let res;
        if (findKey(list, Project) === "back") res = "back"
        else res = "project"

        projectAction[res]({
            config: list?.dynamic?.child,
            name: Project,
            back: ended,
            ended: () => projects_list(props)
        })
    })
    
}


module.exports = {
    back: backUtil,
    add_project,
    projects_list
}