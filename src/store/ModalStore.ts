// the store which indicates the infos about Modal window.

import { create } from "zustand";

type ModalStore = {
  isShown : boolean;
  setShow : (to:boolean) => void;
  toggleShow : () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isShown: false,
  setShow: (to) => {
    set(() => ({isShown: to}))
  },
  toggleShow: () => {
    set((state) => ({
      ...state,
      isShown:!state.isShown
    }))
  }
}));