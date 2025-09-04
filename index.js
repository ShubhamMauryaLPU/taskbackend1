require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");

// Routes
const taskRoute = require("./routes/tasks.route.js");
const userRoute = require("./routes/user.route.js");
const userAuth = require("./routes/auth.routes.js");
const userSampleSchema = require("./models/user.sample.schema.js");
const incomeTaxRoute = require("./routes/incomeTax.routes.js");
const gstRoute = require("./routes/gst.route.js");
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use("/api/v1", userAuth);
app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tax", incomeTaxRoute);
app.use("/api/v1/gst", gstRoute);
// Test route
app.get("/", (req, res) => {
  res.send("Your Backend is working");
});
// Database connection
const mongoUrl = process.env.MONGO_DB_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
