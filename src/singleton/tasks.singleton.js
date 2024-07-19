const Logger = require("../../config/logger");

let tasksInstance;


class SingletonTasksClass {
    #tasks = [
        // {id: 1, Title: "task_1", Description: "description of task_1", Deadline: Date.now(), User: "milad", Project: 'project_1'},
        // {id: 2, Title: "task_2", Description: "description of task_2", Deadline: Date.now(), User: "user_1", Project: 'project_2'},
        // {id: 3, Title: "task_3", Description: "description of task_3", Deadline: Date.now(), User: "milad", Project: 'project_3'},
        // {id: 4, Title: "task_4", Description: "description of task_4", Deadline: Date.now(), User: "user_1", Project: 'project_4'},
        // {id: 5, Title: "task_5", Description: "description of task_5", Deadline: Date.now(), User: "milad", Project: 'project_5'},
        // {id: 6, Title: "task_6", Description: "description of task_6", Deadline: Date.now(), User: "user_2", Project: 'project_6'},
        // {id: 7, Title: "task_7", Description: "description of task_7", Deadline: Date.now(), User: "milad", Project: 'project_7'},
        // {id: 8, Title: "task_8", Description: "description of task_8", Deadline: Date.now(), User: "user_3", Project: 'project_8'},
        // {id: 9, Title: "task_9", Description: "description of task_9", Deadline: Date.now(), User: "user_3", Project: 'project_9'},
        // {id: 10, Title: "task_10", Description: "description of task_10", Deadline: Date.now(), User: "user_2", Project: 'project_10'}
    ];
    constructor() {
        if (tasksInstance) {
          throw new Error("You can only create one instance!");
        }
        tasksInstance = this;
    }

    set(data) {
        this.#tasks = data
    }

    getAll() { 
        return this.#tasks
    }

    getByTitle(title) {
        return this.#tasks.filter(task => task.Title === title)
    }

    getByUser(user) {
        return this.#tasks.filter(task => task.User === user)
    }

    getByProject(Project) {
        return this.#tasks.filter(task => task.Project === Project)
    }

    async create(answers) {
        const {Title, Description, Deadline, User, Project} = answers
        const maxId = this.#tasks.length ? Math.max(...this.#tasks.map(tasks => tasks?.id)) : 0
        const exist = this.#findByTitle(answers.title)
        if (exist) return Logger.Error("task_exist")
        const newTask = {
            id: maxId + 1,
            Title,
            Description,
            Deadline: new Date(Deadline).getTime(),
            User,
            Project,
        }
        this.#tasks.push(newTask);
        Logger.Success("task_created")
        return this.#tasks
    }

    deleteByTitle(title) {
        const deleteTask = this.#tasks.filter(task => task.Title !== title)
        this.#tasks = deleteTask
        Logger.Success("task_deleted")
        return deleteTask
    }

    deleteByUser(user) {
        const deleteTask = this.#tasks.filter(task => task.User !== user)
        this.#tasks = deleteTask
        return deleteTask
    }

    deleteByProject(project) {
        const deleteTask = this.#tasks.filter(task => task.Project !== project)
        this.#tasks = deleteTask
        return deleteTask
    }

    async update(oldName, newValues) {
        const tasksIndex = this.#tasks.findIndex(tasks => tasks.Title === oldName)
        const tasks = [...this.#tasks]
        const oldTask = tasks.splice(tasksIndex, 1)[0]
        const newTask = {
            id: oldTask.id,
            ...newValues
        }
        tasks.splice(tasksIndex, 0, newTask)
        this.#tasks = tasks
        Logger.Success("task_updated")
        return tasks
    }

    #findByTitle(title) {
        return this.#tasks.find(tasks => tasks.Title === title)
    }
}

const TASKS = new SingletonTasksClass()

module.exports = TASKS