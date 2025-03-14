import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreItemsState = {
  selectedIds: number[];
  resetItems: () => void;
  setSelectedIds: (
    ids: number[],
    type: "edit" | "new",
    selectedSubCategoryId?: number[]
  ) => void;
  type: "edit" | "new";
  selectedSubCategoryId: number[];
};

export const useItemsStore = create<StoreItemsState>()(
  persist(
    (set) => ({
      selectedIds: [],
      type: "new",
      selectedSubCategoryId: [],
      setSelectedIds: (ids, type, selectedSubCategoryId) =>
        set({ selectedIds: ids, type, selectedSubCategoryId }),
      resetItems: () =>
        set({ selectedIds: [], type: "new", selectedSubCategoryId: [] }),
    }),
    { name: "IDS" }
  )
);
