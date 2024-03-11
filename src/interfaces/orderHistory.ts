export interface OrderHistoryResponse {
  success: boolean
  orderHistory: OrderHistory[] | []
}

export interface OrderHistory {
  total: number
  orderNr: string
  orderDate: string
}
