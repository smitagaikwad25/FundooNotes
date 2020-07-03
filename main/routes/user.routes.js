module.exports = app => {
    const USER_CONTROLLER = require("../controller/user.controller")

    app.post("/register/user", USER_CONTROLLER.userRegister)
    app.get("/user/loging", USER_CONTROLLER.userLogin)
    app.put("/user/update/:id", USER_CONTROLLER.userUpdate)
}
