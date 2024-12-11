const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
const { findByUsername } = require("../models/userModels");

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username dan password harus diisi!" });
  }

  try {
    const user = await userModel.findByUsername(username);
    if (user) {
      return res.status(400).json({ success: false, message: "Username sudah digunakan!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hashedPassword);

    res.status(201).json({ success: true, message: "Registrasi berhasil!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username dan password harus diisi!" });
  }

  try {
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(404).json({ success: false, message: "Username tidak ditemukan!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Password salah!" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, message: "Login berhasil!", data: { token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
};

const getUserInfo = async (req, res) => {
  try {
    // Extract the username from the token payload
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username; // assuming your token has the 'username' field

    // Find the user in the database
    const user = await findByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's username in the response
    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout berhasil!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat logout.",
    });
  }
};

module.exports = { register, login, logout, getUserInfo };
