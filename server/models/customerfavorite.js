"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerFavorite extends Model {
    static associate(models) {
      CustomerFavorite.belongsTo(models.Customer, { foreignKey: "CustomerId" });
      CustomerFavorite.belongsTo(models.Cuisine, { foreignKey: "CuisineId" });
    }
  }
  CustomerFavorite.init(
    {
      CustomerId: DataTypes.INTEGER,
      CuisineId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CustomerFavorite",
    }
  );
  return CustomerFavorite;
};
