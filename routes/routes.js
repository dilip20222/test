const { validate } = require("../schema/user");
const userSchema = require("../schema/user");
const valiteFun = require("../validate/validate");
const route = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const dotenv = require("dotenv");
const generateToken = require("../utils/tokengen");
dotenv.config();

route.post("/signup", async (req, res) => {
  const { name, userName, DOB, email, password } = req.body;
  //   let data = req.body - TODO Custom Message
  //   valiteFun(data);
  if (name === "" || userName === "" || !DOB || email == "" || password == "") {
    return res.json({ message: "Please Enter Valid Input !" });
  }
  let findUserEmail = await userSchema.find({
    email: email,
    userName: userName,
  });

  if (findUserEmail.length) {
    return res.status(400).json({ message: "Already Exist Cred." });
  }
  let bcryptPass = await bcrypt.hash(password, 10);
  let createUser = new userSchema({
    name: name,
    userName: userName,
    email: email,
    DOB: DOB,
    password: bcryptPass,
  });
  let token = await generateToken(email);
  let newUser = await createUser.save();
  res.status(201).json({ data: newUser, token: token });
});

route.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log("Request--", req.body);
  if (userName === "" || password === "") {
    return res.status(400).json({ message: "Enter valid Input !" });
  }
  let checkUser = await userSchema.findOne({ userName: userName });

  if (checkUser && bcrypt.compareSync(password, checkUser.password)) {
    let loginToken = await generateToken(checkUser?.email);
    return res.status(200).json({ user: checkUser, loginToken: loginToken });
  }
  return res.status(400).json({ message: "Enter valid Credential" });
});

module.exports = route;
