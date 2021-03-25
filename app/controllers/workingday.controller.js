let models = require("../../models");
let User = models.User;
let Company = models.Company;
let WorkingDay = models.WorkingDay;

/* for create working day */
exports.create = async (req, res, next) => {
  try {
    if (!req.body.workingDate) {
      req.body.workingDate = new Date();
    }
    let response = await WorkingDay.create(req.body);
    res.status(200).json({
      status: 1,
      message: "working day created successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* get all working day */
exports.findAll = async (req, res, next) => {
  try {
    let response = await WorkingDay.findAll();

    res
      .status(200)
      .json({ status: 1, message: "Get All working day", data: response });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* get  working day by id */
exports.findById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await WorkingDay.findByPk(id);
    res.status(200).json({
      status: 1,
      message: "fetch working day successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* for update working day */
exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!req.body.workingDate) {
      req.body.workingDate = new Date();
    }
    let num = await WorkingDay.update(req.body, { where: { id: id } });
    if (num == 1) {
      let response = await WorkingDay.findByPk(id);
      res.status(200).json({
        status: 1,
        message: "working day updated successfully",
        data: response,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
