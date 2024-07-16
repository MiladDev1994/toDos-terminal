
const inquirer = require('inquirer');
const findKey = require('../../utils/findKey');
const usersMenu = require("./users/users")
const projectsMenu = require("./projects/projects")

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

// function tasks(list) {
//     inquirer.prompt(list.prompt())
//     .then((answers) => {
//         const {Menu} = answers
//         const res = Object.entries(list).find(([key, value]) => value.title === Menu).shift()
//         // console.log(res)
//     });
// }

// function query_by(list) {
//     inquirer.prompt(list.prompt())
//     .then((answers) => {
//         const {Menu} = answers
//         const res = Object.entries(list).find(([key, value]) => value.title === Menu).shift()
//         // console.log(res)
//     });
// }


module.exports = {
    users,
    projects,
    // tasks,
    // query_by
}