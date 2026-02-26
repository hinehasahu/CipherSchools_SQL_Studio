const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRETKEY = process.env.SECRETKEY;
const saltRounds = 10;

const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await UserModel.findOne({ email }).lean();

  if (userExist)
    return res
      .status(403)
      .json({ message: "User already exist. Please Login." });

  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const data = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = await UserModel.create(data);

    res.status(201).json({ message: "Signup successfully.", newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await UserModel.findOne({ email }).lean();

  if (!userExist)
    return res.status(404).json({ message: "User not found. Please Signup." });

  try {
    const isMatch = await Promise.resolve(
      bcrypt.compare(password, userExist.password),
    );

    if (!isMatch)
      return res.status(403).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: userExist._id }, SECRETKEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ message: "Login successfully.", data: { ...userExist, token } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

module.exports = { Signup, Login };
