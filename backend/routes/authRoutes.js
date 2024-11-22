const express = require("express");
const { register, login, logout } = require("../controllers/authControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);

module.exports = router;
