import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getImageKitAuth } from "../controllers/imageController.js";

const imageRoutes = express.Router();

imageRoutes.get("/auth", protect, getImageKitAuth);

export default imageRoutes;
