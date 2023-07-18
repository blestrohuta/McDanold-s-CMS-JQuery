"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cuisine, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "this email is already registered",
        },
        validate: {
          notNull: { msg: "email cannot is required" },
          notEmpty: { msg: "email cannot is required" },
          isEmail: {
            msg: "email must be email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password cannot is required" },
          notEmpty: { msg: "password cannot is required" },
          customValidator(value) {
            if (value && value.length < 5) {
              throw new Error("The minimum password length is 5 characters");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
