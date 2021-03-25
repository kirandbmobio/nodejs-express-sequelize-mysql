const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const migrateDb = require("./models");
const tutorialRoutes = require("./app/routes/tutorial.routes");
const userRoutes = require("./app/routes/user.routes");
const companyRoutes = require("./app/routes/company.routes");
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/tutorials", tutorialRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);

db.sequelize.sync(/* { force: true }).then(() => {
  console.log("Drop and re-sync db.");
} */);
// migrateDb.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kiran application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
