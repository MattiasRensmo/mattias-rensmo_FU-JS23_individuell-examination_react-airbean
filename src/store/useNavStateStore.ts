import { create } from 'zustand'

interface NavState {
  navVisible: boolean
  setNavVisible: (setTo: boolean) => void
}

export const useNavStateStore = create<NavState>()(set => ({
  navVisible: false,
  setNavVisible: setTo => set(() => ({ navVisible: setTo })),
}))
