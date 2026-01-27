import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    image: { type: String, required: true },

    avgPricePerSqFt: { type: String, required: true },
    rentalYield: { type: String, required: true },
    luxuryRentRange: { type: String, required: true },

    hotspots: { type: [String], required: true },

    status: { type: String, required: true },
    pincode: { type: String, required: true },
    directions: { type: String, required: true },

    availability: {
      type: String,
      enum: ["Available", "Limited", "Speculative"],
      default: "Available",
    },

    areaType: {
      type: String,
      enum: ["Urban", "Semi-Urban", "Rural"],
      default: "Urban",
    },

    contact: { type: String, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Listing", listingSchema);
