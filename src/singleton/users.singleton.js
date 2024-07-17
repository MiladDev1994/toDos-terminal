const Logger = require("../../config/logger");

let usersInstance;


class SingletonUsersClass {
    #users = [
        {id: 1, name: "milad", role: "admin"},
        {id: 1, name: "user_1", role: "user"},
        {id: 2, name: "user_2", role: "user"},
        {id: 3, name: "user_3", role: "user"},
        {id: 4, name: "user_4", role: "user"},
        {id: 5, name: "user_5", role: "user"},
        {id: 6, name: "user_6", role: "user"},
        {id: 7, name: "user_7", role: "user"},
        {id: 8, name: "user_8", role: "user"},
        {id: 9, name: "user_9", role: "user"},
    ];
    constructor() {
        if (usersInstance) {
          throw new Error("You can only create one instance!");
        }
        usersInstance = this;
    }

    getAll() { 
        return this.#users
    }

    getByTitle(name) {
        return this.#users.filter(user => user.name === name)
    }

    async create(name) {
        const maxId = this.#users.length ? Math.max(...this.#users.map(user => user?.id)) : 0
        const exist = this.#findByName(name)
        if (exist) return Logger.Error("users_exist")
        const newUser = {
            id: maxId + 1,
            name,
            role: "user"
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
            name: newName,
            role: "user"
        }
        users.splice(userIndex, 0, newUser)
        this.#users = users
        Logger.Success("user_updated")
        return users
    }

    #findByName(name) {
        return this.#users.find(user => user.user_name === name)
    }
}

const USERS = new SingletonUsersClass()

module.exports = USERS