const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  //nees to be function becuase using this keyword (cna't use with arrow syntax).
  return jwt.sign({ _id: this._id }, process.env.SECRET); //this refers to new user that has been created._id as how it's strutured in mongo-db.
  // when runs, it runs through each character in string until it's reverse thread will rpovide with id of user.
};

const User = mongoose.model("User", userSchema);

module.exports = User;

//same as in week 7.
