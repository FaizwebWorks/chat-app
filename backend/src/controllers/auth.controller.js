import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    // Check if any required field is missing
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    // Check if the user already exists in the database
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a newUser
    const newUser = await User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate a JWT token for the user
      generateToken(newUser._id, res);

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    } else {
      // Respond with an error if the user data is invalid
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("login page");
};

export const logout = (req, res) => {
  res.send("logout page");
};
