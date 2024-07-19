const chalk = require("chalk")
const Chalk = require("../src/utils/chalk")
const listChoices = require("../src/utils/listChoices")


const back = {
    title: chalk.red("<< Back")
}

const exit = {
    title: chalk.red("Exit")
}

const config = Object.freeze({
    list: {
        exit,
        users: {
            title: "Users",
            child: {
                list: {
                    back,
                    add_user: {
                        title: "Add User",
                        child: {
                            prompt: function() {
                                return {
                                    type: 'input',
                                    name: 'Username',
                                    message: Chalk.input('Enter Username: ')
                                }
                            }
                        }
                    },
                    users_list: {
                        title: "Users List",
                        child: {
                            list: {
                                back,
                                dynamic: {
                                    child: {
                                        list: {
                                            back,
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
                                                            message: Chalk.input("Enter new name: ") 
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
                                                            message: Chalk.confirm("are you sure?! ") 
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        prompt: function() {
                                            return {
                                                type: 'list',
                                                name: 'action',
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
                        choices: listChoices(this)
                    }
                }
            }
        },
        projects: {
            title: "Projects",
            child: {
                list: {
                    back,
                    add_project: {
                        title: "Add Project",
                        child: {
                            prompt: function() {
                                return [
                                    {
                                        type: "input",
                                        name: "title",
                                        message: Chalk.input("Enter title: ")  
                                    },
                                    {
                                        type: "input",
                                        name: "description",
                                        message: Chalk.input("Enter description: ")
                                    }
                                ]
                            }
                        }
                    },
                    projects_list: {
                        title: "Projects List",
                        child: {
                            list: {
                                back,
                                dynamic: {
                                    child: {
                                        list: {
                                            back,
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
                                                                message: Chalk.input("Enter title: ")
                                                            },
                                                            {
                                                                type: "input",
                                                                name: "description",
                                                                message: Chalk.input("Enter description: ")
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
                                                            message: Chalk.confirm("are you sure?! ") 
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
            back,
            title: "Tasks",
            child: {
                list: {
                    back,
                    add_task: {
                        title: "Add Task",
                        child: {
                            prompt: function () {
                                return [
                                    {
                                        type: "input",
                                        name: "Title",
                                        message: Chalk.input("Enter Title: ") 
                                    },
                                    {
                                        type: "input",
                                        name: "Description",
                                        message: Chalk.input("Enter Description: ") 
                                    }
                                ]
                            }
                        }
                    },
                    tasks_list: {
                        title: "Tasks List",
                        child: {
                            list: {
                                back,
                                dynamic: {
                                    child: {
                                        list: {
                                            back,
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
                                                                message: Chalk.input("Enter Title: ") 
                                                            },
                                                            {
                                                                type: "input",
                                                                name: "Description",
                                                                message: Chalk.input("Enter Description: ") 
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
                                                            message: Chalk.confirm("are you sure?! ")
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        prompt: function() {
                                            return {
                                                type: 'list',
                                                name: 'action',
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
            back,
            title: "Options",
            child: {
                list: {
                    back,
                    query_by: {
                        title: "Query by",
                        child: {
                            list: {
                                back,
                                user: {
                                    title: "User",
                                    child: {
                                        list: {
                                            back,
                                        },
                                        prompt: function() {
                                            return {
                                                type: 'list',
                                                name: 'User',
                                                choices: listChoices(this)
                                            }
                                        }
                                    }
                                },
                                project: {
                                    title: "Project",
                                    child: {
                                        list: {
                                            back,
                                        },
                                        prompt: function() {
                                            return {
                                                type: 'list',
                                                name: 'Project',
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
                                    message: Chalk.input('Select a directory: '),
                                    basePath: "C:",
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
                                        choices: listChoices(this)
                                    },
                                    {
                                        type: 'directory',
                                        name: 'directory',
                                        message: Chalk.input('Select a directory: '),
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
            choices: listChoices(this)
        }
    }
})

module.exports = {
    config,back
}