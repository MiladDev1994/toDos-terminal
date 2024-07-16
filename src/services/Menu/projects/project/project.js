const inquirer = require("inquirer")
const backUtil = require("../../../../utils/back")
const services = require("./project.service")
const { publicTasks } = require("../../../../../config/config")
const findKey = require("../../../../utils/findKey")

function project (props) {
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
            ended: () => project(props)
        })
    })
}


module.exports = {
    back: backUtil,
    project
}