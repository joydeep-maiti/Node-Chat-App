class Users {
    constructor() {
        this.users=[];
    }
    addUser(id, name) {
        var user = {id, name};
        this.users.push(user);
        // console.log(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList() {
        var users = this.users;
        var namesArray = users.map((user) => user.name);
        // console.log(namesArray);
        return namesArray;
    }
}

module.exports = {Users};