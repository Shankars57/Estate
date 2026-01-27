import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import {
  createListing,
  getListings,
  getListingById,
} from "../controllers/listingController.js";

const listingRoutes = express.Router();

listingRoutes.get("/", getListings);
listingRoutes.get("/:id", getListingById);
listingRoutes.post("/", protect, upload.single("image"), createListing);

export default listingRoutes;
