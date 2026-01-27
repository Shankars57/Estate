import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
} from "../controllers/bookingController.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/", protect, createBooking);
bookingRoutes.get("/me", protect, getMyBookings);

export default bookingRoutes;
