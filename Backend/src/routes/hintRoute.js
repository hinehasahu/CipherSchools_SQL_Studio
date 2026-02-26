const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const hintProvider = require("../controllers/hintController");

const HintRouter = express.Router();

HintRouter.post("/hint", authMiddleware, hintProvider);

module.exports = HintRouter;
