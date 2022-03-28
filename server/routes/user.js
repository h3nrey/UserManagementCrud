const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.get("/", userController.view);
userRoute.post("/", userController.find);
userRoute.post("/:id", userController.delete);

userRoute.get("/adduser", userController.add);
userRoute.post("/adduser", userController.insert);

userRoute.get("/edituser/:id", userController.edit);
userRoute.post("/edituser/:id", userController.update);

module.exports = userRoute;