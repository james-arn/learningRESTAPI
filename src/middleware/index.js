const bcrypt = require("bcryptjs");
const User = require("../user/user.model");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (req, res, next) => {
  //next moves onto next piece of middleware/controller.
  try {
    // const pass = req.body.password;
    // const hashedPass = await bcrypt.hash(pass, 8); // pass is variable and salt is rounds
    // req.body.password = hashedPass; //below is condensed to one line.
    req.body.password = await bcrypt.hash(req.body.password, 8);

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server error logs" }); //dont' want to move to controller when broken.
  }
};

exports.comparePasswords = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(req.body.email);
    // console.log(user);
    const comparisonBool = await bcrypt.compare(req.body.pass, user.password);
    console.log(comparisonBool);
    if (comparisonBool) {
      req.user = user;
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Check server logs. Error while comparing passwords" });
  }
};

exports.tokenAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const tokenObj = jwt.verify(token, process.env.SECRET); // verify decondes token
    console.log(tokenObj);
    const user = await User.findOne({ _id: tokenObj._id });
    console.log(user);
    req.user = user;
    if (!req.user) {
      throw new Error({ message: "error" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};
