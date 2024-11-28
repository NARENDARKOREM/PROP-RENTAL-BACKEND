const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Signup Controller
const registerUser = async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });

    req.session.user = user;

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Signin Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });

    req.session.user = user;

    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update User Controller
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete User Controller
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    try {
        const user = await User.findOne({ where: { id }, paranoid: false });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'User is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await user.destroy({ force: true });
            res.status(200).json({ message: 'User permanently deleted successfully' });
        } else {
            await user.destroy();
            res.status(200).json({ message: 'User soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findByPk(id);
    if (!singleUser) {
      res.status(500).json({ error: "User not found" });
    }
    res.status(200).json(singleUser);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
