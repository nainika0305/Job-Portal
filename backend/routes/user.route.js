import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router(); 3

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// to ensure only authenticated ppl access the update, we make middleware 
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;
