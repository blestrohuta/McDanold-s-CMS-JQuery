"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.CustomerFavorite, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
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
          notNull: { msg: "email is required" },
          notEmpty: { msg: "email is required" },
          isEmail: {
            msg: "email must be email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
          notEmpty: { msg: "password is required" },
          customValidator(value) {
            if (value && value.length < 5) {
              throw new Error("the minimum password length is 5 characters");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
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
      modelName: "Customer",
    }
  );
  Customer.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });
  return Customer;
};
