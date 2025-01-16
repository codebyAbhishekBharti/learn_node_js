const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateById,
  handleDeleteUserByID,
  handleCreateNewUser,
} = require("../controllers/user");

// Routes
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateById)
  .delete(handleDeleteUserByID);

module.exports = router;
