import Listing from "../models/Listing.js";
import imagekit from "../config/imageKit.js";

export const createListing = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/estatehub/listings",
    });

    const listing = await Listing.create({
      city: req.body.city,
      image: uploadResponse.url,
      avgPricePerSqFt: req.body.avgPricePerSqFt,
      rentalYield: req.body.rentalYield,
      luxuryRentRange: req.body.luxuryRentRange,
      hotspots: req.body.hotspots.split(",").map((h) => h.trim()),
      status: req.body.status,
      pincode: req.body.pincode,
      directions: req.body.directions,
      availability: req.body.availability,
      areaType: req.body.areaType,
      contact: req.body.contact,
      createdBy: req.user.id,
    });

    res.status(201).json(listing);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: error.message });
  }
};

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Invalid listing ID" });
  }
};
