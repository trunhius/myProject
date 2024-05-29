import express from "express"
import { logIn, sigIn } from "../controllers/authControllers.js"

const authRoutes = express.Router()

authRoutes.post("/sigin", sigIn);
authRoutes.post("/login", logIn);

export default authRoutes;