module.exports = app => {
    const USER_CONTROLLER = require("../controller/user.controller")

    app.post("/register/user", USER_CONTROLLER.userRegister)
    app.get("/user/loging", USER_CONTROLLER.userLogin)
    app.put("/user/update/:emailID", USER_CONTROLLER.userUpdate)
    app.delete("/user/delete/:emailID", USER_CONTROLLER.deleteUser)
    app.get("/user/search/:emailID", USER_CONTROLLER.searchUser)

}