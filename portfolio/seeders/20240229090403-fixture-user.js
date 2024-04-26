"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    // Hash password
    const hashedPassword = await bcrypt.hash("Johns2024", saltRounds);
    return queryInterface.bulkInsert("user", [
      {
        fname: "Johns David",
        lname: "RAKOTONINDRIANA",
        role: 1,
        civilitie: 1,
        email: "rakotonindrianajohns@gmail.com",
        password: hashedPassword,
        username: "Johns",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user", null, {});
  },
};
