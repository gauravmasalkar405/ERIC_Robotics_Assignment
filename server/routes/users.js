import express from "express";
const router = express.Router();

import { login, logoutUser } from "../controllers/users.js";

import { protect } from "../middleware/auth.js";

router.post("/login", login);

router.post("/logout", protect, logoutUser);

export default router;
