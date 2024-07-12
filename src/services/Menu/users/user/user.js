const inquirer = require("inquirer")
const backUtil = require("../../../../utils/back")
const services = require("./user.service")

function user (props) {
    const {name, back, ended} = props

    inquirer.prompt({
        type: "list",
        name: "action",
        choices: ["Edit", "Delete"]
    })
    .then((answers) => {
        const {action} = answers
        services[action]({
            name,
            back: () => user(props),
            ended
        })
    })
}


module.exports = {
    back: backUtil,
    user
}