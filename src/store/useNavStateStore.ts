//TODO Här behöver vi något som gör att man inte kan klicka på knappen direkt igen utan man måste vänta några ms

import { create } from 'zustand'

interface NavState {
  navVisible: boolean
  setNavVisible: (setTo: boolean) => void
}

export const useNavStateStore = create<NavState>()(set => ({
  navVisible: false,
  setNavVisible: setTo => set(() => ({ navVisible: setTo })),
}))
