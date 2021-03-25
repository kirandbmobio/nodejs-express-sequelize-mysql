const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

/* for create new tutorials */
exports.create = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    let response = await Tutorial.create(req.body);
    console.log(response);
    res
      .status(200)
      .json({ status: 1, message: "Created Successfully", data: response });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
  try {
    let title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    let response = await Tutorial.findAll({ where: condition });
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
