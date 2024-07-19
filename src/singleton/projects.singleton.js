const Logger = require("../../config/logger");

let projectsInstance;


class SingletonProjectsClass {
    #projects = [
        // {id: 1, title: "project_1", description: "description of project_1"},
        // {id: 2, title: "project_2", description: "description of project_2"},
        // {id: 3, title: "project_3", description: "description of project_3"},
        // {id: 4, title: "project_4", description: "description of project_4"},
        // {id: 5, title: "project_5", description: "description of project_5"},
        // {id: 6, title: "project_6", description: "description of project_6"},
        // {id: 7, title: "project_7", description: "description of project_7"},
        // {id: 8, title: "project_8", description: "description of project_8"},
        // {id: 9, title: "project_9", description: "description of project_9"},
        // {id: 10, title: "project_10", description: "description of project_10"}
    ];
    constructor() {
        if (projectsInstance) {
          throw new Error("You can only create one instance!");
        }
        projectsInstance = this;
    }

    set(data) {
        this.#projects = data
    }

    getAll() { 
        return this.#projects
    }

    getByTitle(name) {
        return this.#projects.filter(project => project.title === name)
    }

    async create(answers) {
        const maxId = this.#projects.length ? Math.max(...this.#projects.map(projects => projects?.id)) : 0
        const exist = this.#findByTitle(answers.title)
        if (exist) return Logger.Error("projects_exist")
        const newProject = {
            id: maxId + 1,
            ...answers,
        }
        this.#projects.push(newProject);
        Logger.Success("projects_created")
        return this.#projects
    }

    deleteByTitle(title) {
        const deleteUser = this.#projects.filter(user => user.title !== title)
        this.#projects = deleteUser
        Logger.Success("project_deleted")
        return deleteUser
    }

    async update(oldName, newValues) {
        const projectsIndex = this.#projects.findIndex(projects => projects.title === oldName)
        const projects = [...this.#projects]
        const oldProject = projects.splice(projectsIndex, 1)[0]
        const newProject = {
            id: oldProject.id,
            ...newValues
        }
        projects.splice(projectsIndex, 0, newProject)
        this.#projects = projects
        Logger.Success("project_updated")
        return projects
    }

    #findByTitle(title) {
        return this.#projects.find(user => user.title === title)
    }
}

const PROJECTS = new SingletonProjectsClass()

module.exports = PROJECTS