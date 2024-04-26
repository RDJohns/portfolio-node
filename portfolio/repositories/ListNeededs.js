const db = require("../models/index");

/** FGet all country available
 *
 * @returns Country
 * @author Johns David
 */
const getAllCountry = async () => {
  try {
    const country = await db.Country.findAll();
    return country;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = {
  getAllCountry,
};
