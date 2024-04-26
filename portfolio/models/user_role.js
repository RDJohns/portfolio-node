"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init(
    {
      user_role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_role_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      user_role_created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      user_role_updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_role",
      createdAt: "user_role_created_at",
      updatedAt: "user_role_updated_at",
    }
  );
  return UserRole;
};
