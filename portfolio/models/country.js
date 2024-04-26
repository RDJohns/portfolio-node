"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Country.init(
    {
      country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      country_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country_code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      sequelize,
      modelName: "Country",
      tableName: "country",
      createdAt: "country_created_at",
      updatedAt: "country_updated_at",
    }
  );
  return Country;
};
