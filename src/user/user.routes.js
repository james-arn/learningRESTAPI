const { Router } = require("express"); //curly brakcets as pulled from express.
const { addUser } = require("./user.controllers"); //pullin in controller.
const userRouter = Router(); // assign to const to access with dotnotation. Name related to concern. Take note of capital R.

//CREATE - in order to access this endpoint need to make post request.
userRouter.post("/user", addUser); //need to send data and create so post is used. automatically recieved req and res onbject.
//it will run function if hit. (adduser controller.)

module.exports = userRouter;
