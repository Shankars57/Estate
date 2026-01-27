import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
  clearQuery: () => set({ query: "" }),
}));

export default useSearchStore;
