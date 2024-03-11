import { create } from 'zustand'

interface OrderState {
  orderEta: number
  orderNum: string | null
  setOrderEta: (eta: number) => void
  setOrderNum: (eta: string | null) => void
}

export const useOrderStateStore = create<OrderState>()(set => ({
  orderEta: -1,
  orderNum: null,
  setOrderEta: eta => set(() => ({ orderEta: eta })),
  setOrderNum: num => set(() => ({ orderNum: num })),
}))
