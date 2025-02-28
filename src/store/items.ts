import { create } from "zustand";

interface StoreItemsState {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
}

export const useItemsStore = create<StoreItemsState>((set) => ({
  selectedIds: [],
  setSelectedIds: (ids: number[]) => set({ selectedIds: ids }),
}));
