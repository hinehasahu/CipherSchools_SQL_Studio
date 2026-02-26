const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const ConnectDB = require("./src/configs/db");
const { ConnectPostgreSql } = require("./src/configs/postgreSql");
const UserRouter = require("./src/routes/userRoute");
const AssignmentRouter = require("./src/routes/assignmentRoute");
const ExecuteRouter = require("./src/routes/executeRoute");
const HintRouter = require("./src/routes/hintRoute");

ConnectDB();
ConnectPostgreSql();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://cipherssqlstudio.netlify.app/",
    credentials: true,
  }),
);

app.use("/api/users", UserRouter);
app.use("/api/assignments", AssignmentRouter);
app.use("/api/question", ExecuteRouter);
app.use("/api/gethint", HintRouter);

// To handle unauthorized route
app.use((req, res) => {
  res.status(404).json({ message: "Unauthorized route." });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});
