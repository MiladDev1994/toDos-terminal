const inquirer = require("inquirer")
const backUtil = require("../../../../utils/back")
const services = require("./user.service")
const { publicTasks } = require("../../../../../config/config")
const findKey = require("../../../../utils/findKey")

function user (props) {
    const {config, name, back, ended} = props
    const {list} = config

    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {action} = answers
        const res = findKey(list, action)
        services[res]({
            config: list[res].child,
            name,
            back: ended,
            ended: () => user(props)
        })
    })
}


module.exports = {
    back: backUtil,
    user
}