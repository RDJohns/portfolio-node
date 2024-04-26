const { getUserRolesRepo } = require("../repositories/user/userRoleRepos");
const {
  getUserByWhere,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUsers,
  getAllCivilitesRepo,
} = require("../repositories/userRepo");
const { showError } = require("../middleware/utilities");
const bcrypt = require("bcrypt");
const GetuserByEmail = async (req, res) => {
  const message = "la récupération des données de l'utilisateur";
  try {
    const email = req.user.email;
    const user = await getUserByWhere(` AND email ='${email}'`);

    if (user) {
      res.json({ status: 200, data: user });
    } else {
      res.json({ status: 404, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: showError(2, message),
    });
  }
};

//crud user
const CreateUserController = async (req, res) => {
  const message = "la création de l'utilisateur";
  try {
    const userData = req.body;

    const existingUser = await getUserByWhere(
      ` AND email ='${userData.email}'`
    );
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        error: "Cet email existe déja.",
      });
    }

    const existingUsername = await getUserByWhere(
      ` AND username ='${userData.username}'`
    );

    if (existingUsername) {
      return res.status(400).json({
        status: 400,
        error: "Ce nom d'utilisateur existe déja.",
      });
    }

    const user = await createUser(userData);
    const { password, ...userWithoutPassword } = user.dataValues;
    console.log(userWithoutPassword);
    if (user) {
      res.status(201).json({ status: 201, data: userWithoutPassword });
    } else {
      res.status(500).json({
        status: 500,
        error: showError(1, message),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: showError(2, message),
    });
  }
};

const DeleteUserController = async (req, res) => {
  const message = "la suppression de l'utilisateur";
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId);

    if (deletedUser) {
      res
        .status(200)
        .json({ status: 200, message: "Utilisateur supprimé avec succès" });
    } else {
      res.status(404).json({ status: 404, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: showError(2, message),
    });
  }
};

const DeleteUsersController = async (req, res) => {
  try {
    const userIds = req.body.userIds;

    if (!userIds || userIds.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "Aucun identifiant d'utilisateur fourni.",
      });
    }

    const deletedUsers = await deleteUsers(userIds);

    if (deletedUsers !== null) {
      res.status(200).json({
        status: 200,
        message: ` utilisateurs ont été supprimés avec succès.`,
      });
    } else {
      res.status(404).json({
        status: 404,
        error: "Aucun utilisateur trouvé avec les identifiants fournis.",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression des utilisateurs :", error);
    res.status(500).json({
      status: 500,
      error: "Erreur lors de la suppression des utilisateurs.",
    });
  }
};

const UpdateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const existingUserByID = await getUserById(userId);

    if (existingUserByID.email !== userData.email) {
      const existingUserByEmail = await getUserByWhere(
        ` AND email ='${userData.email}'`
      );
      if (existingUserByEmail) {
        return res.status(400).json({
          status: 400,
          error: "Cet email existe déja.",
        });
      }
    }

    if (existingUserByID.username !== userData.username) {
      const existingUserByUserName = await getUserByWhere(
        ` AND username ='${userData.username}'`
      );
      if (existingUserByUserName) {
        return res.status(400).json({
          status: 400,
          error: "Ce nom d'utilisateur existe déja.",
        });
      }
    }
    if (`${existingUserByID.username}BSL-2024-Dev` === userData.password) {
      delete userData.password;
    } else {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    const updatedRowsCount = await updateUser(userId, userData);

    if (updatedRowsCount > 0) {
      const user = await getUserById(userId);
      res.status(200).json({ status: 200, message: user });
    } else {
      res.status(404).json({ status: 404, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).json({
      status: 500,
      error: "Erreur lors de la mise à jour de l'utilisateur",
    });
  }
};

const GetUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    if (user) {
      res.status(200).json({ status: 200, data: user });
    } else {
      res.status(404).json({ status: 404, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par ID :",
      error
    );
    res.status(500).json({
      status: 500,
      error: "Erreur lors de la récupération de l'utilisateur par ID",
    });
  }
};

const GetAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    const roles = await getUserRolesRepo();
    const civilites = await getAllCivilitesRepo();

    if (users) {
      res.status(200).json({
        status: 200,
        data: { users: users, roles: roles, civilites: civilites },
      });
    } else {
      res.status(404).json({ status: 404, error: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les utilisateurs :",
      error
    );
    res.status(500).json({
      status: 500,
      error: "Erreur lors de la récupération de tous les utilisateurs",
    });
  }
};

module.exports = {
  GetuserByEmail,
  CreateUserController,
  DeleteUserController,
  DeleteUsersController,
  UpdateUserController,
  GetUserByIdController,
  GetAllUsersController,
};
