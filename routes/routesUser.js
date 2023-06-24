import express from "express";
import { getAllUsers, createUser, updateUser, getUser } from "../controllers/UserController.js";

const router = express.Router();

router.get('/usuarios', getAllUsers);
router.get('/usuarios/:id', getUser);
router.post('/usuarios', createUser);
router.put('/usuarios/:id', updateUser);

export default router;


