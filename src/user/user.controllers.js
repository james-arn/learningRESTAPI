const User = require("./user.model"); //model specific methods.

//CREATE - res rewq needed everytime.req everythign sient, res everythign sent back.
// use in API client POST http://localhost:5000/user and enter JSON data. see readme for more
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken(); // will now generate token and assign it specificall yto user creater.
    //this replaces all yarg input. wriets json file an dsends to back end.
    //   console.log(req.body); // need to see what request is (data type e.g. array) so you know how to access what's contained inside.
    //.body above gets rleelavtn info only
    // const newUser = new User()
    await newUser.save();
    res
      .status(200)
      .send({ message: "success", user: newUser.username, token: token }); // needed or will tiem out. Got to send it.
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Adding user went wrong. Check server logs." }); //response if fails.
  }
};

//READ - login.
exports.logIn = async (req, res) => {
  try {
    const token = await req.user.generateAuthToken(); // this gets token to retrieve infoon user.
    res.status(200).send({ user: req.user, token: token }); //finding a user and sending it back. easy.
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};

//READ - uses GET (does not accept .body)
exports.getUsers = async (req, res) => {
  try {
    const userList = await User.find({});
    console.log("Successfully read database.");
    res.status(200).send({ userList });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Reading database went wrong. Check server logs." }); //response if fails.
  }
};

//UPDATE - put accepts .body
exports.updateEmail = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { username: req.body.username },
      { email: req.body.email }
    );
    console.log({ username: req.body.username }, { email: req.body.email });
    console.log("email updated.");
    res.status(200).send({ message: "Success" }); // needed or will tiem out. Got to send it.
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Reading database went wrong. Check server logs." }); //response if fails.
  }
};

//DELETE - uses delete (does not accept .body - accepts .params)
exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.params.username }); //mongoose finds and delete all to do withthat username.
    res.status(200).send({ message: "success - user deleted from database" }); // needed or will time out. like return statement.
  } catch (error) {
    res.status(500).send({ message: "Check server logs" });
  }
};
