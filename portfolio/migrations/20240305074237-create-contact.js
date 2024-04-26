"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contact", {
      contact_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contact_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contact_email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contact_country: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "country",
          key: "country_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      contact_zipcode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contact_city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contact_adress_1: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contact_adress_2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contact_adress_3: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contact_phone_1: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contact_phone_2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contact_fax: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contact_comment: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      contact_active: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      contact_user_id_update: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      contact_user_id_create: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
      },
      contact_created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      contact_updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contact");
  },
};
