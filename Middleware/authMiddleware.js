const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      req.body.userId = decoded.userID;

      next();
    } else {
      res.status(400).send({ msg: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(400).send({ verifyMsg: error.message });
  }
};

module.exports = { Auth };
