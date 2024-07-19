const chalk = require('chalk');
const inquirer = require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
// inquirer.registerPrompt('file-tree-selection', require('inquirer-file-tree-selection-prompt'));
const {config} = require("../config/config")
const menu = require("./services/Menu/menu");
const findKey = require('./utils/findKey');
const USERS = require('./singleton/users.singleton');
const PROJECTS = require('./singleton/projects.singleton');
const TASKS = require('./singleton/tasks.singleton');

function Main() {
    const {list} = config
    const users = USERS.getAll()
    const projects = PROJECTS.getAll()
    let prompt = {...config.prompt()}
    if (!users.length || !projects.length) {
        prompt = {
            ...prompt,
            choices: prompt.choices.filter(e => e !== "Tasks")
        }
    }
    inquirer.prompt(prompt)
    .then((answers) => {
        const {Menu} = answers
        const res = findKey(list, Menu)
        menu[res]({
            config: list[res].child,
            back: Main
        })
    });
}
Main();