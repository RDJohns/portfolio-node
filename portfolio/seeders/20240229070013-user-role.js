"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_role", [
      {
        user_role_name: "Super admin",
      },
      {
        user_role_name: "Admin",
      },
      {
        user_role_name: "Client",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_role", null, {});
  },
};
