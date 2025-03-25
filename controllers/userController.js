const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};



// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs"); // ✅ Import bcrypt
// const User = require("../models/userModel");

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // ✅ Generate a JWT token
//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({ message: "JWT_SECRET is missing in .env" });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       token, // ✅ Send token
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         budget: user.budget,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

//Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Update Password Controller
const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { budget } = req.body;
    const userId = req.user._id; // ✅ Extract user ID from token

    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { budget },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Budget updated successfully", budget: user.budget });
  } catch (error) {
    console.error("Update budget error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getBudget = async (req, res) => {
  try {
    // Example response (Replace this with actual DB logic)
    res.status(200).json({ budget: 10000, spent: 8500 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget data" });
  }
};

module.exports = {
  loginController,
  registerController,
  updatePassword,
  updateBudget,
  getBudget,
};
