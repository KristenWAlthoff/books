const userDAO = require('../dao/user');

const userService = {}

userService.createUser = (username, password, email) => {
    userDAO.createUser(username, password, email)
}



module.exports = userService;