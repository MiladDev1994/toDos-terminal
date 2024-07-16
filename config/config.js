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
            title: "Projects",
            child: {
                list: {
                    ...publicTasks,
                    add_project: {
                        title: "Add Project",
                        child: {
                            prompt: function() {
                                return [
                                    {
                                        type: "input",
                                        name: "title",
                                        message: "Enter title:"
                                    },
                                    {
                                        type: "input",
                                        name: "description",
                                        message: "Enter description:"
                                    }
                                ]
                            }
                        }
                    },
                    projects_list: {
                        title: "Projects List",
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
                                                        return [
                                                            {
                                                                type: "input",
                                                                name: "title",
                                                                message: "Enter title:"
                                                            },
                                                            {
                                                                type: "input",
                                                                name: "description",
                                                                message: "Enter description:"
                                                            }
                                                        ]
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
                                                type: "list",
                                                name: "action",
                                                choices: listChoices(this)
                                            }
                                        }
                                    }
                                }
                            },
                            prompt: function() {
                                return {
                                    type: "list",
                                    name: "Project",
                                    choices: listChoices(this)
                                }
                            }
                        }
                    }
                },
                prompt: function() {
                    return {
                        type: "list",
                        name: "Project",
                        choices: listChoices(this)
                    }
                }
            }
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
})

module.exports = {
    config, 
    publicTasks
}