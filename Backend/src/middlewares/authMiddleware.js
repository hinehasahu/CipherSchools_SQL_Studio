const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ message: "Access denied. Token not found." });
  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

module.exports = authMiddleware;
