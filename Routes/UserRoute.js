import express from "express";
import { createUser, deleteUser, getUserById, getUsers } from "../Controllers/User.js";

const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user/", createUser);
router.delete("/user/:id", deleteUser);


export default router;