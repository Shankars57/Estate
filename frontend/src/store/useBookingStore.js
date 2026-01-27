import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";

const useBookingStore = create((set) => ({
  loading: false,
  bookings: [],

  createBooking: async ({ listingId, date, time }) => {
    try {
      set({ loading: true });
      const res = await api.post("/bookings", {
        listingId,
        date,
        time,
      });
      toast.success("Visit booked successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchMyBookings: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/bookings/me");
      set({ bookings: res.data });
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBookingStore;
