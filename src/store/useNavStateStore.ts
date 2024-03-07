//TODO Här behöver vi något som gör att man inte kan klicka på knappen direkt igen utan man måste vänta några ms

import { create } from 'zustand'

interface NavState {
  visible: boolean
  toggleVisible: () => void
}

export const useNavStateStore = create<NavState>()(set => ({
  visible: false,
  toggleVisible: () => set(state => ({ visible: !state.visible })),
}))
