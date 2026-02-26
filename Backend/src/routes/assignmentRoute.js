const express = require("express");
const {
  getAssignments,
  addAssignments,
  getAssignmentById,
} = require("../controllers/AssignmentController");
const authMiddleware = require("../middlewares/authMiddleware");

const AssignmentRouter = express.Router();

AssignmentRouter.get("/get", getAssignments);

AssignmentRouter.get("/get/:id", authMiddleware, getAssignmentById);

AssignmentRouter.post("/add", authMiddleware, addAssignments);

module.exports = AssignmentRouter;
