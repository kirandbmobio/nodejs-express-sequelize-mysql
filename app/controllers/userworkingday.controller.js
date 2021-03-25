let models = require("../../models");
let User = models.User;
let Company = models.Company;
let WorkingDay = models.WorkingDay;
let UsersWorkingDay = models.UsersWorkingDay;

/* for create user working day */
exports.create = async (req, res, next) => {
  try {
    let response = await UsersWorkingDay.create(req.body);
    res.status(200).json({
      status: 1,
      message: "user working day created successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* for all user working day */
exports.findAll = async (req, res, next) => {
  try {
    let response = await UsersWorkingDay.findAll({}, { include: "days" });
    res.status(200).json({
      status: 1,
      message: "fetch all user working day successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
