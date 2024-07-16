const inquirer = require('inquirer');
const backUtil = require('../../../../utils/back');
const Logger = require('../../../../../config/logger');
const PROJECTS = require('../../../../singleton/projects.singleton');

function edit(props) {
    const {config, name, back, ended} = props
    inquirer.prompt(config.prompt())
    .then( async (answers) => {
        const {title, description} = answers
        if (!title || !description) {
            Logger.Error("projects_failed_update")
            back()
        } else if (title.length < 4 || description.length < 20) {
            Logger.Error("projects_length")
            edit(props)
        } else {
            await PROJECTS.update(name, answers)
            ended()
        }
    })

}

function remove(props) {
    const {config, name, back, ended} = props
    inquirer.prompt(config.prompt())
    .then((answers) => {
        const {Delete} = answers
        if (!Delete) {
            ended()
        } else {
            PROJECTS.deleteByTitle(name)
            back()
        }
    })

}

module.exports = {
    back: backUtil,
    edit,
    remove
}