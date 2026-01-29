import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStaticBookingStore = create(
  persist(
    (set, get) => ({
      staticBookings: [],

      addStaticBooking: (booking) =>
        set({ staticBookings: [...get().staticBookings, booking] }),

      clearStaticBookings: () => set({ staticBookings: [] }),
    }),
    {
      name: "static-bookings",
    }
  )
);

export default useStaticBookingStore;
