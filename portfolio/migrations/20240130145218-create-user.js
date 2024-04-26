"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_role",
          key: "user_role_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        defaultValue: 3,
      },
      civilitie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_civilitie",
          key: "user_civility_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        defaultValue: 1,
      },
      fname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
