const inquirer = require('inquirer');
const USERS = require('../../../../singleton/users.singleton');
const backUtil = require('../../../../utils/back');
const TableUtil = require('../../../../utils/table');
const Logger = require('../../../../../config/logger');

function view(props) {
    const {config, name, back, ended} = props
    const findTask = USERS.getByTitle(name)
    TableUtil(findTask)
    ended()
}

function edit(props) {
    const {config, name, back, ended} = props
    inquirer.prompt(config.prompt())
    .then( async (answers) => {
        const {Edit} = answers
        if (!Edit) {
            Logger.Error("users_failed_update")
            back()
        } else if (Edit.length < 4) {
            Logger.Error("users_length")
            edit(props)
        } else {
            await USERS.update(name, Edit)
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
            USERS.deleteByName(name)
            back()
        }
    })

}

module.exports = {
    back: backUtil,
    view,
    edit,
    remove
}