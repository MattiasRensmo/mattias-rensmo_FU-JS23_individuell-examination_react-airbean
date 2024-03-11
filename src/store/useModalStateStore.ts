//TODO Här behöver vi något som gör att man inte kan klicka på knappen direkt igen utan man måste vänta några ms

import { create } from 'zustand'

interface ModalState {
  modalVisible: boolean
  toggleModalVisible: () => void
}

export const useModalStateStore = create<ModalState>()(set => ({
  modalVisible: false,
  toggleModalVisible: () =>
    set(state => ({ modalVisible: !state.modalVisible })),
}))
