const inquirer = require("inquirer")
const backUtil = require("../../../../utils/back")
const findKey = require("../../../../utils/findKey")
const services = require("./task.service")

function task (props) {
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
            ended: () => task(props)
        })
    })
}


module.exports = {
    back: backUtil,
    task
}