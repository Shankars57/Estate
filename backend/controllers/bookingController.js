import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { listingId, date, time } = req.body;

    if (!listingId || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      listing: listingId,
      date,
      time,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("listing");

    res.json(bookings);
  } catch (err) {
    console.error("Fetch bookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
