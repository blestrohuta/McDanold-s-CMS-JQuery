"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
      Cuisine.hasMany(models.CustomerFavorite, { foreignKey: "CuisineId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name cannot is required" },
          notEmpty: { msg: "name cannot is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "description cannot is required" },
          notEmpty: { msg: "description cannot is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "price cannot is required" },
          notEmpty: { msg: "price cannot is required" },
          min: {
            args: 50000,
            msg: "minimum price is 50000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "image cannot is required" },
          notEmpty: { msg: "image cannot is required" },
        },
      },
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
