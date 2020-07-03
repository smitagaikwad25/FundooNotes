module.exports = app => {
    const USER_CONTROLLER = require("../controller/user.controller")

    app.post("/register/user", USER_CONTROLLER.userRegister)

}
