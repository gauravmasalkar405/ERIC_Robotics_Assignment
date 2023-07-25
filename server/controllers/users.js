import asyncHandler from "../middleware/asyncHandler.js";
import { users } from "../data/users.js";
import generateToken from "../utils/generateToken.js";

// authenticate user and login
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // find user
  const user = users.find((user) => user.username === username);

  // Check if the user exists and password matches
  if (user && user.password === password) {
    // generate token
    generateToken(res, user.id);

    res.status(200).json({
      id: user.id,
      name: user.username,
      status: "true",
    });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Logged out successfully", status: true });
});
