require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const classRoute = require("./routes/class")
const teacherRoute = require("./routes/teacher")
const studentRoute = require("./routes/student")

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  console.log("I am in Health api");
  res.json({
    service: "Backend School Management Application Api server",
    status: "active",
    time: new Date(),
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/class", classRoute)
app.use("/api/v1/teacher", teacherRoute)
app.use("/api/v1/student", studentRoute)

app.use((error, req, res, next) => {
  res.status(500).json({ errorMessage: "Something went wrong!" });
});

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Backend Server Listening at port: ${PORT}`))
    .catch((err) => console.log(err));
});