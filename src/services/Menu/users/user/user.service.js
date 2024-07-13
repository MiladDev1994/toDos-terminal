const inquirer = require('inquirer');
const USERS = require('../../../../singleton/users.singleton');
const backUtil = require('../../../../utils/back');

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
            Edit(props)
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
    edit,
    remove
}