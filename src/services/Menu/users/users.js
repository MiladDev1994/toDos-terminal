const inquirer = require('inquirer');
const backUtil = require("../../../utils/back")
const userNameValidation = require("./validation");
const Logger = require("../../../../config/logger");
const USERS = require('../../../singleton/users.singleton');
const userAction = require("./user/user")
const findKey = require('../../../utils/findKey');


async function add_user(props) {
    const {config, ended} = props
    
    inquirer.prompt(config.prompt)
    .then( async (answers) => {
        const {Username} = answers
        if (!Username) {
            Logger.Error("users_failed")
            ended()
        } else if (Username.length < 4) {
            Logger.Error("users_length")
            add_user(props)
        } else {
            await USERS.create(Username)
            ended()
        }
    })
    
}

async function users_list(props) {
    const {config, ended} = props
    const users = USERS.getAll()
    if (!users.length) {
        Logger.Warning("user_not_found")
        return ended()
    } 

    const usersArray = []
    const usersObject = {}
    users.forEach(user => {
        usersArray.push(user.name)
        usersObject[user.name] = user.name
    })
    const list = {
        ...config.list,
        ...usersObject
    }
    const prompt = {
        ...config.prompt(),
        choices: [
            ...config.prompt().choices,
            ...usersArray
        ]
    }

    inquirer.prompt(prompt)
    .then( async (answers) => {
        const {User} = answers
        let res;
        if (findKey(list, User) === "back") res = "back"
        else res = "user"

        userAction[res]({
            name: User,
            back: ended,
            ended: () => users_list(props)
        })
    })
    
}



module.exports = {
    back: backUtil,
    add_user,
    users_list
}