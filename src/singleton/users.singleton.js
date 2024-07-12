const Logger = require("../../config/logger");

let usersInstance;


class SingletonUsersClass {
    #users = [];
    constructor() {
        if (usersInstance) {
          throw new Error("You can only create one instance!");
        }
        usersInstance = this;
    }

    getAll() { 
        return this.#users
    }

    async create(name) {
        const maxId = this.#users.length ? Math.max(...this.#users.map(user => user?.id)) : 0
        console.log(maxId)
        const exist = this.#findByName(name)
        if (exist) return Logger.Error("users_exist")
        const newUser = {
            id: maxId + 1,
            name
        }
        this.#users.push(newUser);
        Logger.Success("users_created")
        return this.#users
    }

    deleteByName(name) {
        const deleteUser = this.#users.filter(user => user.name !== name)
        this.#users = deleteUser
        Logger.Success("users_deleted")
        return deleteUser
    }

    async update(oldName, newName) {
        const userIndex = this.#users.findIndex(user => user.name === oldName)
        const users = [...this.#users]
        const oldUser = users.splice(userIndex, 1)[0]
        const newUser = {
            id: oldUser.id,
            name: newName
        }
        users.splice(userIndex, 0, newUser)
        this.#users = users
        return users
    }

    #findByName(name) {
        return this.#users.find(user => user.user_name === name)
    }
}

const USERS = new SingletonUsersClass()

module.exports = USERS