import React from 'react'
import { OrderHistory } from '../interfaces/orderHistory'

const HistoryRow = ({ orderNr, total, orderDate }: OrderHistory) => {
  return (
    <div>
      <p>{orderNr}</p>
      <p>{orderDate}</p>
      <p>total ordersumma</p>
      <p>{total}</p>
    </div>
  )
}

export default HistoryRow
