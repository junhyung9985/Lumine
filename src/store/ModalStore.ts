// the store which indicates the infos about Modal window.

import { create } from "zustand";

type ModalStore = {
  isShown : boolean;
  modalContent: string;
  setModalContent:(content:string) => void;
  setShow : (to:boolean) => void;
  toggleShow : () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isShown: false,
  modalContent:"",
  setShow: (to) => {
    set(() => ({isShown: to}))
  },
  setModalContent: (value) => {
    set(() => ({modalContent: value}))
  },
  toggleShow: () => {
    set((state) => ({
      ...state,
      isShown:!state.isShown
    }))
  }
}));