const chalk = require('chalk');
const inquirer = require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
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