const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = require("./router/userRouter");
const siteRouter = require("./router/siteRouter");
const droneRouter = require("./router/droneRouter");
const missionRouter = require("./router/missionRouter");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("working");
})

app.use("/user", userRouter);
app.use("/api", siteRouter);
app.use("/api", droneRouter);
app.use("/api", missionRouter)

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.6thvyoc.mongodb.net/"
  )
  .then(() => {
    console.log("database connected ");
  })
  .catch((error) => {
    console.log(error);
  });


app.listen(5000, () => {
    console.log("server is started")
})