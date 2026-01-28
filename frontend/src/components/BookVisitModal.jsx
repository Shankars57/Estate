import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import useBookingStore from "../store/useBookingStore";
import { useNavigate } from "react-router-dom";

const BookVisitModal = ({ isOpen, onClose, property }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const { createBooking, loading } = useBookingStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if(!token){
    toast.error("Please login to book a visit");
    navigate("/login");
  }
  React.useEffect(() => {
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setName(userData.name || "");
      setEmail(userData.email || "");
    }
  }, [token]);
  if (!isOpen) return null;

 const handleSubmit = async (e) => {
  e.preventDefault();

 
  if (!property._id) {
    toast.error("Demo properties cannot be booked");
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-2">Book a Visit</h2>

        <p className="text-sm text-gray-500 mb-6">
          Schedule a visit for{" "}
          <span className="font-semibold">{property.city}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Booking..." : "Confirm Visit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookVisitModal;
