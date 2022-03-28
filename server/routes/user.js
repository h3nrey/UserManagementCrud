const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.get("/", userController.view);
userRoute.post("/", userController.find);
userRoute.get("/adduser", userController.addUser);
userRoute.post("/adduser", userController.insertUser);

module.exports = userRoute;