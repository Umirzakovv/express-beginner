import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
export async function register(req, res) {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// GET ME
export async function getMe(req, res) {
  res.json({
    user: req.user,
  });
}
