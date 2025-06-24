import create from "zustand";

export const useHelpModal = create<{
  showHelpModal: boolean;
}>()(() => ({
  showHelpModal: false,
}));
