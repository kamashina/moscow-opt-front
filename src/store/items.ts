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
  selectedSubCategoryIds: number[];
};

export const useItemsStore = create<StoreItemsState>()(
  persist(
    (set) => ({
      selectedIds: [],
      type: "new",
      selectedSubCategoryIds: [],
      setSelectedIds: (ids, type, selectedSubCategoryIds) =>
        set({ selectedIds: ids, type, selectedSubCategoryIds }),
      resetItems: () =>
        set({ selectedIds: [], type: "new", selectedSubCategoryIds: [] }),
    }),
    { name: "IDS" }
  )
);
