const chalk = require("chalk")
const listChoices = require("../src/utils/listChoices")
const USERS = require("../src/singleton/users.singleton")


const publicTasks = {
    back: {
        title: chalk.red("<< Back")
    },
    // view_logs: {
    //     title: chalk.yellow("{...View_Logs}")
    // },
    // save: {
    //     title: chalk.green("Save")
    // },
}


const config = Object.freeze({
    list: {
        users: {
            title: "Users",
            child: {
                list: {
                    ...publicTasks,
                    add_user: {
                        title: "Add User",
                        child: {
                            prompt: function() {
                                return {
                                    type: 'input',
                                    name: 'Username',
                                    message: chalk.bgBlue('Enter Username:')
                                }
                            }
                        }
                    },
                    users_list: {
                        title: "Users List",
                        child: {
                            list: {
                                ...publicTasks,
                                dynamic: {
                                    child: {
                                        list: {
                                            ...publicTasks,
                                            edit: {
                                                title: "Edit",
                                                child: {
                                                    prompt: function() {
                                                        return {
                                                            type: "input",
                                                            name: "Edit",
                                                            message: "Enter new name"
                                                        }
                                                    }
                                                }
                                            },
                                            remove: {
                                                title: "Delete",
                                                child: {
                                                    prompt: function() {
                                                        return {
                                                            type: "confirm",
                                                            name: "Delete",
                                                            message: "are you sure?!"
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        prompt: function() {
                                            return {
                                                type: 'list',
                                                name: 'action',
                                                // message: chalk.bgGray('Select an item:'),
                                                choices: listChoices(this)
                                            }
                                        }
                                    }
                                }
                            },
                            prompt: function() {
                                return {
                                    type: 'list',
                                    name: 'User',
                                    // message: chalk.bgGray('Select an item:'),
                                    choices: listChoices(this)
                                }
                            }
                        }
                    }
                },
                prompt: function() {
                    return {
                        type: 'list',
                        name: 'Users',
                        // message: chalk.bgGray('Select an item:'),
                        choices: listChoices(this)
                    }
                }
            }
        },
        projects: {
            title: "Projects"
        },
        tasks: {
            title: "Tasks"
        },
        query_by: {
            title: "Query by"
        },
    },
    prompt: function() {
        return {
            type: 'list',
            name: 'Menu',
            // message: chalk.bgGray('Select an item:'),
            choices: listChoices(this)
        }
    }
    // list: {
    //     ...publicTasks,
    //     "Name": "Name",
    //     "Family": "Family",
    //     "Username": "Username",
    //     "Email": "Email",
    //     "Phone": "Phone",
    //     "Age": "Age",
    //     "Male": "Male",
    //     "Skills": "Skills",
    //     "Birth Day": "Birth Day",
    //     "Favorite": "Favorite",
    //     "is Working?": "is Working?",
    //     "Language": "Language",
    //     "Address": "Address",
    //     "Groups": "Groups",
    // },
    // prompt: function() {
    //     return {
    //         type: 'list',
    //         name: 'input',
    //         message: chalk.bgGray('Select an input:'),
    //         choices: Object.keys(this.list)
    //     }
    // }
})

module.exports = {
    config, 
    publicTasks
}