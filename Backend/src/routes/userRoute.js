const express = require("express");
const { Signup, Login } = require("../controllers/userController");

const UserRouter = express.Router();

UserRouter.post("/signup", Signup);

UserRouter.post("/login", Login);

module.exports = UserRouter;
