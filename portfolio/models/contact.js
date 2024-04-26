"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {
        foreignKey: "contact_user_id_update",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      Contact.belongsTo(models.User, {
        foreignKey: "contact_user_id_create",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      Contact.belongsTo(models.Country, {
        foreignKey: "contact_country",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }
  Contact.init(
    {
      contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contact_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contact_email: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contact_country: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contact_zipcode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contact_city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contact_adress_1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contact_adress_2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contact_adress_3: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contact_phone_1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contact_phone_2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contact_fax: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contact_comment: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      contact_active: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      contact_user_id_update: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      contact_user_id_create: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      contact_created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      contact_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Contact",
      tableName: "contact",
      createdAt: "contact_created_at",
      updatedAt: "contact_updated_at",
    }
  );
  return Contact;
};
