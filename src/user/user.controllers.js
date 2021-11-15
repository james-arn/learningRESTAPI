const User = require("./user.model"); //model specific methods.

//CREATE - res rewq needed everytime.req everythign sient, res everythign sent back.
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    //this replaces all yarg input. wriets json file an dsends to back end.
    await newUser.save();
    //   console.log(req.body); // need to see what request is (data type e.g. array) so you know how to access what's contained inside.
    //.body above gets rleelavtn info only
    // const newUser = new User()
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Something went wrong. Check server logs." }); //response if fails.
  }
};
