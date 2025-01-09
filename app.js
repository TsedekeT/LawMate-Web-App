const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("/Client")); 

// Routes
app.use("/users", require("./Backend/routes/user"));
app.use("/cases", require("./Backend/routes/case"));
app.use("/appointments", require("./Backend/routes/appointment"));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Client/index.html");
});
app.get("/lawyer", (req, res) => {
    res.sendFile(__dirname + "/Client/pages/lawyer.html");
  });
  

// Start server
app.listen(process.env.PORT || 8890, () => {
  console.log("listening to port 8890");
});
