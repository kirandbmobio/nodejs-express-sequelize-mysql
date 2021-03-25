let models = require("../../models");
let User = models.User;
let Company = models.Company;
let WorkingDay = models.WorkingDay;

/* create new company */
exports.create = async (req, res, next) => {
  try {
    // let company = req.body;
    let response = await Company.create(req.body);
    console.log(response);
    res.status(200).json({
      status: 1,
      message: "Company Created Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* find all companies */
exports.findAll = async (req, res, next) => {
  try {
    let response = await Company.findAll({ include: "employees" });
    res
      .status(200)
      .json({ status: 1, message: "All Companies Data", data: response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

/* find by id */
exports.findById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await Company.findByPk(id, { include: "employees" });
    res
      .status(200)
      .json({ status: 1, message: "Company Data", data: response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

/* update Company */
exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;
    let num = await Company.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      let response = await Company.findByPk(id, { include: "employees" });
      return res
        .status(200)
        .json({ status: 1, message: "Updated Data", data: response });
    } else {
      res.status(200).json({ status: 1, message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
