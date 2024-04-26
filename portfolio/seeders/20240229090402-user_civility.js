"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_civilitie", [
      {
        user_civility_name: "Mr",
      },
      {
        user_civility_name: "Mme",
      },
      {
        user_civility_name: "Mlle",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_civilitie", null, {});
  },
};
