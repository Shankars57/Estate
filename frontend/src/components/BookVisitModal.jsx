import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import useBookingStore from "../store/useBookingStore";
import useStaticBookingStore from "../store/useStaticBookingStore";
import { useNavigate } from "react-router-dom";

const BookVisitModal = ({ isOpen, onClose, property }) => {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const { createBooking, loading } = useBookingStore();
  const { addStaticBooking } = useStaticBookingStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!isOpen) return null;

  if (!token) {
    toast.error("Please login to book a visit");
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!property._id) {
      addStaticBooking({
        listing: property,
        date,
        time,
      });
      toast.success("Demo visit booked");
      onClose();
      return;
    }

    await createBooking({
      listingId: property._id,
      date,
      time,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl w-full max-w-md p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Book a Visit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Booking..." : "Confirm Visit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookVisitModal;
