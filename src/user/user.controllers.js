const User = require("./user.model"); //model specific methods.

//CREATE - res rewq needed everytime.req everythign sient, res everythign sent back.
// use in API client POST http://localhost:5000/user and enter JSON data. see readme for more
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken(); // will now generate token and assign it specificall yto user creater.
    //this replaces all yarg input. wriets json file an dsends to back end.
    await newUser.save();
    //   console.log(req.body); // need to see what request is (data type e.g. array) so you know how to access what's contained inside.
    //.body above gets rleelavtn info only
    // const newUser = new User()
    res.status(200).send({ message: "success", newUser, token }); // needed or will tiem out. Got to send it.
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
    res.status(200).send(req.user); //finding a user and sending it back. easy.
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

//UPDATE
exports.updateUsername = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { username: req.params.username },
      { username: req.params.username }
    );
    console.log("Username updated.");
    res.status(200).send({ message: "success" }); // needed or will tiem out. Got to send it.
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Reading database went wrong. Check server logs." }); //response if fails.
  }
};

//DELETE - uses delete (does not accept .body - params)
exports.deleteUser = async (req, res, next) => {
  try {
    const userToDelete = req.params.username;
    await User.findOneAndRemove({ username: userToDelete });
    res.status(200).send({ message: "success - user deleted from database" }); // needed or will time out.
    console.log("Deleted from database.");
  } catch (error) {
    res.status(500).send({ message: "Check server logs" });
  }
};
