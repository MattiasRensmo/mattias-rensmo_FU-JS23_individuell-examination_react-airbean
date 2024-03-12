import { create } from 'zustand'

interface LoggedInState {
  loggedIn: boolean
  setLoggedIn: (isLoggedIn: boolean) => void
}

export const useLoggedInStateStore = create<LoggedInState>()(set => ({
  loggedIn: false,
  setLoggedIn: isLoggedIn => set(() => ({ loggedIn: isLoggedIn })),
}))
