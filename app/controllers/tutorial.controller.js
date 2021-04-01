const db = require("../models");
const Tutorial = db.tutorials;
const Posts = db.posts;
const Op = db.Sequelize.Op;
const { Sequelize } = require("sequelize");
const { sequelize } = require("../models");
// const QRCode = require("qrcode");

// exports.qrcode = async (req, res, next) => {
//   try {
//     // let newUrl;
//     QRCode.toString("I am a pony!", { type: "terminal" }, function (err, url) {
//       console.log(url);
//       //   newUrl = url;
//     });
//     let string = req.body.qr_string;
//     QRCode.toFile("./qr_code/qrcode.png", string, async (err) => {
//       console.log(err);
//       let newUrl = await QRCode.toDataURL(string);
//       console.log(newUrl);
//       res.status(200).json({
//         status: 1,
//         message: "Qr generated successfully.",
//         url: newUrl,
//       });
//     });
//   } catch (err) {}
// };
/* for create new tutorials */
exports.create = async (req, res, next) => {
  let t = await sequelize.transaction();
  try {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    let response = await Tutorial.create(req.body /* {fields: ['title']} */);
    console.log(response);
    t.commit();
    res
      .status(200)
      .json({ status: 1, message: "Created Successfully", data: response });
  } catch (err) {
    const messages = {};
    err.errors.forEach((error) => {
      let message;
      //   switch (error.validatorKey) {
      //     case "not_unique":
      //       message = "Duplicate Title";
      //       break;
      //     case "equals":
      //       message = `${error.message}`;
      //       break;
      //     case "isIn":
      //       message = `${error.message}`;
      //       break;
      //   }
      message = error.message;
      messages[error.path] = message;
      console.log(messages);
    });
    t.rollback();
    return res.status(500).json({ message: messages });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
  try {
    let title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    let response = await Tutorial.scope("checkStatus").findAll({
      //   where: {
      //     id: 1,
      //   },
      attributes: ["title", "id", "description"],
      include: {
        model: Posts,
        attributes: [["name", "postName"]],
      },
      //   attributes: [
      //     "title",
      //     "description",
      //     "id",
      //     // [Sequelize.fn("Count", Sequelize.col("title")), "idCount"],
      //   ],
      //   attributes: {
      //     exclude: ["created_at", "update_at"],
      //     include: [
      //       [
      //         Sequelize.fn("CONCAT", Sequelize.col("title"), "Singh"),
      //         "Full title",
      //       ],
      //     ],
      //   },
      //   where: {id:1},
      //   order: [["title", "DESC"]],
      // group: ["title"],
      //   limit: 2,
      //   offset: 1,
    });
    res.status(200).json({
      status: 1,
      message: title ? "Find by title" : "All Tutorials",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await Tutorial.findByPk(id);
    res.status(200).json({
      status: 1,
      message: "Find By Id",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;
    let num = await Tutorial.update(req.body, { where: { id: id } });
    if (num == 1) {
      let response = await Tutorial.findByPk(id);
      res.status(200).json({
        status: 1,
        message: "Tutorial Updated Successfully.",
        data: response,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await Tutorial.destroy({ where: { id: id } });
    if (response == 1) {
      res
        .status(200)
        .json({ status: 1, message: "Tutorial Deleted Successfully" });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res, next) => {
  try {
    let nums = await Tutorial.destroy({ where: {}, truncate: false });
    if (nums) {
      res
        .status(200)
        .json({ status: 1, message: `${nums} Tutorial Deleted Successfully` });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res, next) => {
  try {
  } catch (err) {}
};

exports.oneToMany = async (req, res, next) => {
  try {
    let response = await Tutorial.findAll({
      where: {
        id: 1,
      },
      include: {
        model: Posts,
        as: "postInfo",
      },
    });
    console.log(response);
    res.status(200).json({ status: 1, message: "one to many", data: response });
  } catch (err) {}
};
