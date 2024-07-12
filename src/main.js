const chalk = require('chalk');
const inquirer = require('inquirer');
const config = require("../config/config")
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




// inquirer.registerPrompt('directory', require('inquirer-select-directory'));


// function Main() {
//     inquirer.prompt({
//         type: 'directory',
//         message: "dddd",
//         name: "milad",
//         basePath: "C:"
//       })
//     .then((answers) => {
//         const {input} = answers
//         // console.log(this.list[input])
//     });
// }