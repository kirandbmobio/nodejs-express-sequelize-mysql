const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const migrateDb = require("./models");
const tutorialRoutes = require("./app/routes/tutorial.routes");
const userRoutes = require("./app/routes/user.routes");
const companyRoutes = require("./app/routes/company.routes");
const userWorkingDayRoutes = require("./app/routes/userworkingday.routes");
const workingDayRoutes = require("./app/routes/workingday.routes");
const postsRoutes = require("./app/routes/posts.routes");
const tagsRoutes = require("./app/routes/tag.routes");
const commentRoutes = require("./app/routes/comment.routes");
const videoRoutes = require("./app/routes/video.routes");
const imageRoutes = require("./app/routes/image.routes");
const taggableRoutes = require("./app/routes/tag_taggable.routes");
const commonRoutes = require("./app/routes/common.routes");
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
app.use("/api/working_day", workingDayRoutes);
app.use("/api/user/working_day", userWorkingDayRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/tag_taggable", taggableRoutes);
app.use("/api/common", commonRoutes);

db.sequelize.sync(/* { force: true, match: /testdb$/ } */);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kiran application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
