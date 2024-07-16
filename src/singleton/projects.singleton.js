const Logger = require("../../config/logger");

let projectsInstance;


class SingletonProjectsClass {
    #projects = [
        {id: 1, title: "project_1", description: "description of project_1"}
    ];
    constructor() {
        if (projectsInstance) {
          throw new Error("You can only create one instance!");
        }
        projectsInstance = this;
    }

    getAll() { 
        return this.#projects
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