const {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { authenticateToken } = require("../middleware/authMiddleware");
const express = require("express");
const {
  isExisteContact,
  isIdContactExist,
  isValideContact,
} = require("../middleware/contact/verifContactMiddleware");
const { isParamIdValid } = require("../middleware/paramMiddleware");

const router = express.Router();

// /**********************************************************************************************/
// //***********                         Routes for contact                      ***********/
// //*********************************************************************************************/
router.get("/", authenticateToken, getAllContact);
router.get("/:id", authenticateToken, isParamIdValid, getContactById);

router.post(
  "/",
  authenticateToken,
  isValideContact,
  isExisteContact,
  createContact
);

router.put(
  "/:id",
  authenticateToken,
  isParamIdValid,
  isIdContactExist,
  isValideContact,
  isExisteContact,
  updateContact
);
router.delete(
  "/:id",
  authenticateToken,
  isParamIdValid,
  isIdContactExist,
  deleteContact
);

module.exports = router;
