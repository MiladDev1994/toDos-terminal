const inquirer = require('inquirer');
const USERS = require('../../../../singleton/users.singleton');

function Edit(props) {
    const {name, back, ended} = props
    inquirer.prompt({
        type: "input",
        name: "Edited",
        message: "Enter new name"
    })
    .then( async (answers) => {
        const {Edited} = answers
        if (!Edited) {
            Logger.Error("users_failed_update")
            back()
        } else if (Edited.length < 4) {
            Logger.Error("users_length")
            Edit(props)
        } else {
            await USERS.update(name, Edited)
            ended()
        }
    })

}

function Delete(props) {
    const {name, back, ended} = props
    inquirer.prompt({
        type: "confirm",
        name: "Deleted",
        message: "are you sure?!"
    })
    .then((answers) => {
        const {Deleted} = answers
        if (!Deleted) {
            back()
        } else {
            USERS.deleteByName(name)
            ended()
        }
    })

}

module.exports = {
    Edit,
    Delete
}