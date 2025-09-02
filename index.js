require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskRoute = require("./routes/tasks.route.js");
const userRoute=require("./routes/user.route.js");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/user",userRoute);
app.get("/", (req, res) => {
  res.send("Your Backend is working");
});
const mongoUrl = process.env.MONGO_DB_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));

app.listen(8080, () => console.log("Server running on port 8080"));
