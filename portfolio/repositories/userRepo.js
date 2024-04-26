const db = require("../models/index");
const getLogin = async (username) => {
  try {
    const user = await db.User.findOne({
      attributes: ["id", "username", "password", "email"],
      where: { username },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getUserByWhere = async (where) => {
  try {
    const query = `
    SELECT 
    id,
    username,
    email, 
    role as id_role,
    fname,
    lname,
    civilitie as id_civilitie,
    LPAD(id::text, 4, '0') as numero,user_role_name
    FROM public."user"
    LEFT JOIN public.user_role ON user_role_id = role
      WHERE  1=1 ${where}
    `;
    const [user, _] = await db.sequelize.query(query, {
      replacements: {},
      type: db.sequelize.QueryTypes.SELECT,
    });
    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par ID :",
      error
    );
    return null;
  }
};

const createUser = async (userData, transaction) => {
  try {
    transaction = await db.sequelize.transaction();

    const user = await db.User.create(userData, { transaction });

    await transaction.commit();

    return user;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    if (transaction) {
      await transaction.rollback();
    }
    return null;
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await db.User.destroy({
      where: { id: userId },
    });
    return deletedUser;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return null;
  }
};

const deleteUsers = async (userIds) => {
  try {
    const deletedUsers = await db.User.destroy({
      where: { id: userIds },
    });
    return deletedUsers;
  } catch (error) {
    console.error("Erreur lors de la suppression des utilisateurs :", error);
    return null;
  }
};

const updateUser = async (userId, userData) => {
  try {
    transaction = await db.sequelize.transaction();

    const [updatedRowsCount] = await db.User.update(userData, {
      where: { id: userId },
      transaction: transaction,
    });
    await transaction.commit();
    return updatedRowsCount;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    if (transaction) {
      await transaction.rollback();
    }
    return null;
  }
};

const getUserById = async (userId) => {
  try {
    const query = `
    SELECT 
    id,
    username,
    email, 
    role as id_role,
    fname,
    lname,
    civilitie as id_civilitie,
    LPAD(id::text, 4, '0') as numero,user_role_name
    FROM public."user"
    LEFT JOIN public.user_role ON user_role_id = role
      WHERE id = :userId
    `;
    const [user, _] = await db.sequelize.query(query, {
      replacements: { userId },
      type: db.sequelize.QueryTypes.SELECT,
    });
    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par ID :",
      error
    );
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const users = await db.sequelize.query(
      `
      SELECT 
      id,
      json_build_object(
          'type', 'rond_label',
          'value',CONCAT(lname,' ',fname)
        ) as username,
      email, 
      user_role_name as role,
      fname,
      lname,
      TO_CHAR("createdAt", 'YYYY-MM-DD HH24:MI:SS') as createdAt, 
      TO_CHAR("updatedAt", 'YYYY-MM-DD HH24:MI:SS') as updatedAt, 
      false as check,
      json_build_object(
        'type', 'icon',
        'color', 2,
        'value', 'fas fa-trash',
        'action_name', 'delete_user',
        'ref_action', 'id'
      ) as delete,
      json_build_object(
        'action_name', 'update_user',
        'ref_action', 'id'
      ) as param_update,
      LPAD(id::text, 4, '0') as numero,
      role as id_role,
      civilitie as id_civilitie
      FROM public."user"
      LEFT JOIN public.user_role ON user_role_id = role
      order by id ASC
    `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    return users;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les utilisateurs :",
      error
    );
    return null;
  }
};

const getAllCivilitesRepo = async () => {
  try {
    const users = await db.sequelize.query(
      `SELECT user_civility_id, user_civility_name
      FROM public.user_civilitie
    `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    return users;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les utilisateurs :",
      error
    );
    return null;
  }
};

const getAllUserAgent = async () => {
  try {
    const userAgent = await db.sequelize.query(
      ` SELECT *
      FROM public."user"
      WHERE role IN (3, 5, 6, 7)
      order by id ASC
    `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return userAgent;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les utilisateurs :",
      error
    );
    return null;
  }
};

module.exports = {
  getLogin,
  getUserByWhere,
  createUser,
  deleteUser,
  deleteUsers,
  updateUser,
  getUserById,
  getAllUsers,
  getAllCivilitesRepo,
  getAllUserAgent,
};
