import React from 'react'
import { OrderHistory } from '../interfaces/orderHistory'
import style from './HistoryRow.module.scss'

const HistoryRow = ({ orderNr, total, orderDate }: OrderHistory) => {
  return (
    <div className={style.orderRow}>
      <p className={style.orderNr}>{orderNr}</p>
      <p className={style.orderDate}>{orderDate}</p>
      <p className={style.totalText}>total ordersumma</p>
      <p className={style.total}>{total} kr</p>
    </div>
  )
}

export default HistoryRow
