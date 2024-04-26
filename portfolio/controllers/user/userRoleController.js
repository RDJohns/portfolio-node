const { getUserRolesRepo } = require("../../repositories/user/userRoleRepos");

const getAllUserRoles = async (req, res) => {
  try {
    const email = req.user.email;
    const user_roles = await getUserRolesRepo();

    if (user_roles) {
      res.json({ status: 200, data: user_roles });
    } else {
      res.json({ status: 404, error: "Role non trouvé" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données deu rôle.",
      error
    );
    res.status(500).json({
      status: 500,
      error: "Erreur lors de la récupération des données du rôle",
    });
  }
};
module.exports = {
  getAllUserRoles,
};
