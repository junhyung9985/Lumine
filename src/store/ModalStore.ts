// the store which indicates the infos about Modal window.

import { create } from "zustand";

export enum ModalState {
  PENDING = "pending",
  ERROR = "error",
  SUCCESS = "success"
}

type ModalStore = {
  isShown : boolean;
  modalState : ModalState;
  modalContent: string;
  setModalContent:(content:string) => void;
  setShow : (to:boolean) => void;
  setModalState: (to:ModalState) => void;
  toggleShow : () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isShown: false,
  modalContent:"",
  modalState: ModalState.SUCCESS,
  setShow: (to) => {
    set(() => ({isShown: to}))
  },
  setModalContent: (value) => {
    set(() => ({modalContent: value}))
  },
  setModalState: (to) => {
    set(() => ({modalState : to}))
  },
  toggleShow: () => {
    set((state) => ({
      ...state,
      isShown:!state.isShown
    }))
  }
}));