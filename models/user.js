"use strict";

const crypto = require("crypto");
const { get } = require("http");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("password");
        },
      },
      salt: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("salt");
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    User.belongsTo(models.Company, { foreignKey: "companyId", as: "company" });
    User.belongsToMany(models.WorkingDay, {
      through: "UsersWorkingDays",
      foreignKey: "userId",
      as: "days",
    });
  };

  const setSaltAndPassword = (user) => {
    console.log(user);
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };
  User.generateSalt = () => {
    return crypto.randomBytes(16).toString("base64");
  };

  User.encryptPassword = (plainText, salt) => {
    let encryptPwd = crypto
      .createHash("sha256", "kiran")
      .update(plainText)
      .update(salt)
      .digest("hex");

    return encryptPwd;
  };
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);
  return User;
};
