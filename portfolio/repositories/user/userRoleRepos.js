const db = require("../../models/index");
/**
 * Get all role available with active status
 *
 * @param {int} client_id
 * @returns Branch
 * @author Johns David
 */
const getUserRolesRepo = async () => {
  try {
    const branch = await db.UserRole.findAll({
      where: {
        user_role_active: 1,
      },
    });
    return branch;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = {
  getUserRolesRepo,
};
