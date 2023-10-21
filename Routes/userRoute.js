const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userModel");
const { blacklistModel } = require("../Models/blacklishModel");

const UserRoute = require("express").Router();

require("dotenv").config();

UserRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.send({
        msg: "User Already Exist, Please Login...!",
      });
    }

    const hash = bcrypt.hashSync(password, 5);

    const user = new userModel({ name, email, password: hash });

    await user.save();

    res.send({ msg: "user has been registered successfully", user });
  } catch (error) {
    res.send({ msg: error.msg });
  }
});

UserRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (!isUserExist) {
      return res.status(401).send({ msg: "User does not exist" });
    }

    var result = bcrypt.compareSync(password, isUserExist.password);

    if (!result) {
      return res.status(401).send({ msg: "invalid  password" });
    }

    const token = jwt.sign({ userID: isUserExist._id }, "masai");

    res.send({ msg: "login successfull", user: isUserExist, Token: token });
  } catch (error) {
    res.send({ msg: error.msg });
  }
});

UserRoute.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const blackAccess = new blacklistModel({ token: accesstoken });
    await blackAccess.save();

    res.send({ msg: "logout successfull....." });
  } catch (error) {
    res.send({ msg: error.msg });
  }
});

module.exports = { UserRoute };
