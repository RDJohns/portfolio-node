const { authenticateToken } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  GetuserByEmail,
  CreateUserController,
  DeleteUserController,
  DeleteUsersController,
  GetUserByIdController,
  GetAllUsersController,
  UpdateUserController,
} = require("../controllers/userController");
const { isValideUser } = require("../middleware/userMiddleware");

router.get("/user-data", authenticateToken, GetuserByEmail);
//crud user
router.post("", authenticateToken, isValideUser, CreateUserController);
router.delete("/:id", authenticateToken, DeleteUserController);
router.put("/:id", authenticateToken, isValideUser, UpdateUserController);
router.get("/:id", authenticateToken, GetUserByIdController);
router.get("", authenticateToken, GetAllUsersController);
router.delete("", authenticateToken, DeleteUsersController);

module.exports = router;
