import { create } from "zustand";
import api from "../api/axios";

const useProfileStore = create((set) => ({
  user: null,
  bookings: [],
  loading: false,

  fetchProfile: async () => {
    set({ loading: true });
    const res = await api.get("/auth/profile");
    set({ user: res.data, loading: false });
  },

  fetchBookings: async () => {
    set({ loading: true });
    const res = await api.get("/bookings/me");
    set({ bookings: res.data, loading: false });
  },
}));

export default useProfileStore;
