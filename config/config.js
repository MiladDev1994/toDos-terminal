const chalk = require("chalk")
const listChoices = require("../src/utils/listChoices")


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
                                            view: {
                                                title: "View Details",
                                            },
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
                                            view: {
                                                title: "View Details",
                                            },
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
            ...publicTasks,
            title: "Tasks",
            child: {
                list: {
                    ...publicTasks,
                    add_task: {
                        title: "Add Task",
                        child: {
                            prompt: function () {
                                return [
                                    {
                                        type: "input",
                                        name: "Title",
                                        message: "Enter Title"
                                    },
                                    {
                                        type: "input",
                                        name: "Description",
                                        message: "Enter Description"
                                    }
                                ]
                            }
                        }
                    },
                    tasks_list: {
                        title: "Tasks List",
                        child: {
                            list: {
                                ...publicTasks,
                                dynamic: {
                                    child: {
                                        list: {
                                            ...publicTasks,
                                            view: {
                                                title: "View Details",
                                            },
                                            edit: {
                                                title: "Edit",
                                                child: {
                                                    prompt: function() {
                                                        return [
                                                            {
                                                                type: "input",
                                                                name: "Title",
                                                                message: "Enter Title"
                                                            },
                                                            {
                                                                type: "input",
                                                                name: "Description",
                                                                message: "Enter Description"
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
                                    name: 'Tasks',
                                    // message: chalk.bgGray('Select an item:'),
                                    choices: listChoices(this)
                                }
                            }
                        }
                    }
                },
                prompt: function() {
                    return {
                        type: "list",
                        name: 'Tasks',
                        choices: listChoices(this)
                    }
                }
            }
        },
        options: {
            ...publicTasks,
            title: "Options",
            child: {
                list: {
                    ...publicTasks,
                    query_by: {
                        title: "Query by",
                        child: {
                            list: {
                                ...publicTasks,
                                user: {
                                    title: "User",
                                    child: {
                                        list: {
                                            ...publicTasks,
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
                                },
                                project: {
                                    title: "Project",
                                    child: {
                                        list: {
                                            ...publicTasks,
                                        },
                                        prompt: function() {
                                            return {
                                                type: 'list',
                                                name: 'Project',
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
                                    name: 'Query',
                                    // message: chalk.bgGray('Select an item:'),
                                    choices: listChoices(this)
                                }
                            }
                        }
                    },
                    import_data: {
                        title: "Import",
                        child: {
                            prompt: function() {
                                return {
                                    type: 'directory',
                                    name: 'directory',
                                    message: chalk.bgGray('Select a directory:'),
                                    basePath: "C:",
                                    // options: {
                                    //     displayFiles: true, // for show files
                                    //     displayHidden: true // for show hidden files and directory
                                    // }
                                }
                            }
                        }
                    },
                    export_data: {
                        title: "Export",
                        child: {
                            list: {
                                json: {
                                    title: "Json"
                                },
                                excel: {
                                    title: "Excel"
                                }
                            },
                            prompt: function() {
                                return [
                                    {
                                        type: 'list',
                                        name: 'type',
                                        // message: chalk.bgGray('Select an item:'),
                                        choices: listChoices(this)
                                    },
                                    {
                                        type: 'directory',
                                        name: 'directory',
                                        message: chalk.bgGray('Select a directory:'),
                                        basePath: "C:",
                                    }
                                ]
                            }
                        }
                    },
                },
                prompt: function() {
                    return {
                        type: 'list',
                        name: 'Options',
                        // message: chalk.bgGray('Select an item:'),
                        choices: listChoices(this)
                    }
                }
            }
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