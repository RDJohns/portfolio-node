"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      civilitie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    }
  );
  // Hash password before saving to the database
  User.beforeCreate(async (user) => {
    if (user.changed("password")) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });
  // Add a method to compare hashed passwords
  User.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};
