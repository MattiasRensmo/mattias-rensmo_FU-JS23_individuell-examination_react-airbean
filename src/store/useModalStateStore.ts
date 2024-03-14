import { create } from 'zustand'

interface ModalState {
  modalVisible: boolean
  toggleModalVisible: () => void
  setModalVisible: (setTo: boolean) => void
}

export const useModalStateStore = create<ModalState>()(set => ({
  modalVisible: false,
  toggleModalVisible: () =>
    set(state => ({ modalVisible: !state.modalVisible })),
  setModalVisible: setTo => set(() => ({ modalVisible: setTo })),
}))
