require("../src/db/connection");
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/user.routes");
const movieRouter = require("./movies/movies.routes");
const app = express(); // have to assign to const
const port = process.env.PORT || 5000; //have to assign to port.

//need 3 things:
app.use(express.json());
//recieves request as JOSN, converts to JS object, then when sending out, it converts it to JSON. This increases speed massively.
//it's a string so super small fiel szie and rapid.
app.use(cors()); //cross origin resource sharing enables
app.use(userRouter);
app.use(movieRouter);
// below is anoyminous function is a controller. hit health in point. good to check and a test.
app.get("/health", (req, res) => {
  res.send({ message: "server's up" });
});

//below enables app to listenon lport, console logs it's listening on port. must be at bottom.
app.listen(port, () => {
  console.log(`Listening on port ${port}`); //ensure backticks.
});
