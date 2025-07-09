import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.send("User created");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).send("Invalid credentials");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true }).send("Logged in");
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").send("Logged out");
});


router.get('/check', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Unauthorized');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
});



export default router;


