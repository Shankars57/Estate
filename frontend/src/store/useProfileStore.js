import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
import useStaticBookingStore from "./useStaticBookingStore";

const useProfileStore = create((set) => ({
  user: null,
  bookings: [],
  loading: false,

  fetchProfile: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/profile");
      set({ user: res.data });
    } catch {
      toast.error("Failed to load profile");
    } finally {
      set({ loading: false });
    }
  },

  fetchBookings: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/bookings/me");
      const staticBookings =
        useStaticBookingStore.getState().staticBookings;

      set({
        bookings: [
          ...res.data,
          ...staticBookings.map((b) => ({
            ...b,
            isStatic: true,
          })),
        ],
      });
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProfileStore;
