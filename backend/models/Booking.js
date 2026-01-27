import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    date: String,
    time: String,
    status: { type: String, default: "Confirmed" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
