const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const executeQuestion = require("../controllers/executeController");

const ExecuteRouter = express.Router();

ExecuteRouter.post("/execute/:assignmentId", authMiddleware, executeQuestion);

module.exports = ExecuteRouter;
