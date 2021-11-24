const { Router } = require("express"); //curly brakcets as pulled from express.
const {
  addUser,
  getUsers,
  logIn,
  deleteUser,
  updateEmail,
} = require("./user.controllers"); //pullin in controller.
const { hashPassword, comparePasswords, tokenAuth } = require("../middleware");
const userRouter = Router(); // assign to const to access with dotnotation. Name related to concern. Take note of capital R.

//CREATE - in order to access this endpoint need to make post request. see readme.
//need to send data and create so post is used. automatically recieved req and res onbject.
//it will run function if hit. (adduser controller.)

userRouter.post("/user", hashPassword, addUser);

//compare password
userRouter.post("/login", comparePasswords, logIn);

//auto log in feature using tokens:
userRouter.get("/token", tokenAuth, logIn);

//UDPATE - PUT
userRouter.put("/user", updateEmail);

//READ -make get request. see readme.
userRouter.get("/user", getUsers); //getUser controller for read function

//DELETE
userRouter.delete("/user/:username", deleteUser); //anythign after user is consider req.params.username colon variable name is express parameter.

module.exports = userRouter;
