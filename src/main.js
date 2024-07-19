const chalk = require('chalk');
const inquirer = require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
// inquirer.registerPrompt('file-tree-selection', require('inquirer-file-tree-selection-prompt'));
const {config} = require("../config/config")
const menu = require("./services/Menu/menu");
const findKey = require('./utils/findKey');

function Main() {
    const {list} = config
    inquirer.prompt(config.prompt())
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