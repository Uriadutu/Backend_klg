import express from "express";
import { login, Logout, Me, register, updateUser } from "../Controllers/Auth.js";
import { verifyUser } from "../Middleware/AuthUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/user/", verifyUser, updateUser);
router.get("/me", Me);
router.delete("/logout", Logout);

export default router;