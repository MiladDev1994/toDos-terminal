const inquirer = require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
const backUtil = require("../../../utils/back")
const Logger = require("../../../../config/logger");
const USERS = require('../../../singleton/users.singleton');
const PROJECTS = require('../../../singleton/projects.singleton');
const TASKS = require('../../../singleton/tasks.singleton');
const findKey = require('../../../utils/findKey');
const taskAction = require("./task/task");
const Chalk = require('../../../utils/chalk');


async function add_task(props) {
    const {config, ended} = props
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
            ended()
        } else if (
            Title.length < 4
            || Description.length < 20
        ) {
            Logger.Error("task_length")
            add_task(props)
        } else {
            await TASKS.create(answers)
            ended()
        }
    })
    
}

async function tasks_list(props) {
    const {config, ended} = props
    const tasks = TASKS.getAll()
    if (!tasks.length) {
        Logger.Warning("tasks_not_found")
        return ended()
    } 

    const tasksArray = []
    const tasksObject = {}
    tasks.forEach(task => {
        tasksArray.push(task.Title)
        tasksObject[task.Title] = task.Title
    })
    const list = {
        ...config.list,
        ...tasksObject
    }
    const prompt = {
        ...config.prompt(),
        choices: [
            ...config.prompt().choices,
            ...tasksArray
        ]
    }

    inquirer.prompt(prompt)
    .then( async (answers) => {
        const {Tasks} = answers
        let res;
        if (findKey(list, Tasks) === "back") res = "back"
        else res = "task"

        taskAction[res]({
            config: list?.dynamic?.child,
            name: Tasks,
            back: ended,
            ended: () => tasks_list(props)
        })
    })
    
}


module.exports = {
    back: backUtil,
    add_task,
    tasks_list
}