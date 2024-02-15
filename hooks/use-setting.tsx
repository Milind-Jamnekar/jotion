import { create } from "zustand";

type SettingStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};
export const useSetting = create<SettingStore>((set, get) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
