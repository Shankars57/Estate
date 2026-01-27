import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";

const useListingStore = create((set) => ({
  listings: [],
  loading: false,

  fetchListings: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/listings");
      set({ listings: res.data });
    } catch {
      toast.error("Failed to fetch listings");
    } finally {
      set({ loading: false });
    }
  },

  fetchListingById: async (id) => {
    try {
      set({ loading: true });
      const res = await api.get(`/listings/${id}`);
      return res.data;
    } catch {
      toast.error("Failed to load property");
    } finally {
      set({ loading: false });
    }
  },

  addListing: async (formData) => {
    try {
      set({ loading: true });
      const res = await api.post("/listings", formData);

      set((state) => ({
        listings: [...state.listings, res.data],
      }));

      toast.success("Property added successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add listing");
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteListing: async (id) => {
    try {
      set({ loading: true });
      await api.delete(`/listings/${id}`);

      set((state) => ({
        listings: state.listings.filter((l) => l._id !== id),
      }));

      toast.success("Listing deleted");
    } catch {
      toast.error("Failed to delete listing");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useListingStore;
