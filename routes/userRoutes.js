const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/user/signup", userController.registerUser);
router.post("/user/signin", userController.loginUser);
router.put("/user/:id", authMiddleware.isAuthenticated, userController.updateUser);
router.delete("/user/:id", authMiddleware.isAuthenticated, userController.deleteUser);
router.get("/all-users", authMiddleware.isAuthenticated, userController.getAllUsers);
router.get("/single-user/:id", authMiddleware.isAuthenticated, userController.getUserById);

module.exports = router;
