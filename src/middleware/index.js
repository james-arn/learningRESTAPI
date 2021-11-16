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
    const user = await User.findOne({ email: req.body.email }); //find one as dont' wantt ot work with array.
    const comparisonBool = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (comparisonBool) {
      req.user = user; //use dotnation to add user variable to the request object. Bit liek const user in request object.
      // in the request hter eis now a new key value air. keyis user and value is what we found in database.
      //if passwords mathc, add to request body and move to next method.
      next(); // to move on
    } else {
      res.status(500).send({ message: "Incorrect credentials" });
      //throws generic error to catch block. Now if it says check server logs and we have an empty array, we know it's here
    }
  } catch (error) {
    res.status(500).send({ message: "Check server error logs" });
  }
};

exports.tokenAuth = async (req, res, next) => {
  try {
    // recieveing token and need to output a user.
    const token = req.header("Authorization"); // gives us access to header in api client with dotnotation.
    const noBearerToken = token.replace("Bearer ", ""); //method to remove berer from string.
    const tokenObj = jwt.verify(noBearerToken, process.env.SECRET); //verify and then it decodes the token.
    const user = await User.findOne({ _id: tokenObj._id }); // search data base for particualr user.
    req.user = user; //calls it..?
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};
