const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.get("/", userController.view);
userRoute.post("/", userController.find);


userRoute.get("/adduser", userController.add);
userRoute.post("/adduser", userController.insert);

userRoute.get("/edituser/:id", userController.edit);
userRoute.post("/edituser/:id", userController.update);
userRoute.get("/viewuser/:id", userController.viewdetailed);
userRoute.get("/:id", userController.delete);

module.exports = userRoute;