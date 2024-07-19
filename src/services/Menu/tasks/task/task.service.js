const inquirer = require('inquirer');
const TASKS = require('../../../../singleton/tasks.singleton');
const backUtil = require('../../../../utils/back');
const Logger = require('../../../../../config/logger');
const USERS = require('../../../../singleton/users.singleton');
const PROJECTS = require('../../../../singleton/projects.singleton');
const TableUtil = require('../../../../utils/table');
const timestamp2FullDate = require('../../../../utils/timestamp2FullDate');

function view(props) {
    const {config, name, back, ended} = props
    const findTask = TASKS.getByTitle(name)
    findTask.map(task => {
        const fullDate = timestamp2FullDate(task.Deadline)
        task.Deadline = fullDate
    })
    TableUtil(findTask)
    ended()
}

function edit(props) {
    const {config, name, back, ended} = props
    const users = USERS.getAll()
    const projects = PROJECTS.getAll()

    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours()+1;
    const minutes = date.getMinutes();

    const datePicker = {
        type: "datepicker",
        name: "Deadline",
        message: Chalk.input("Enter Deadline: "),
        min: {
          year,
          month,
          day,
          hour,
          minutes
        },
    }
    const usersList = {
        type: "list",
        name: "User",
        message: Chalk.input("Select User"),
        choices: users.map(user => user.name)
    }
    const projectsList = {
        type: "list",
        name: "Project",
        message: Chalk.input("Select Project"),
        choices: projects.map(project => project.title)
    }

    inquirer.prompt([...config.prompt(), datePicker, usersList, projectsList])
    .then( async (answers) => {
        const {Title, Description, Deadline, User, Project} = answers
        if (
            !Title 
            || !Description
            || !Deadline
            || !User
            || !Description
            || !Project
        ) {
            Logger.Error("task_failed")
            back()
        } else if (
            Title.length < 4
            || Description.length < 20
        ) {
            Logger.Error("task_length")
            edit(props)
        } else {
            await TASKS.update(name, answers)
            ended()
        }
    })
}

function remove(props) {
    const {config, name, back, ended} = props
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {Delete} = answers
        if (!Delete) {
            ended()
        } else {
            TASKS.deleteByTitle(name)
            back()
        }
    })
}

module.exports = {
    back: backUtil,
    view,
    edit,
    remove
}