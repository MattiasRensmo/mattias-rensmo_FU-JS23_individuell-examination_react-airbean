import { useState } from 'react'
import plus from '../assets/img/icons/plus.svg'
import useDebounce from '../hooks/useDebounce'
import { useCartStateStore } from '../store/useCartStateStore'
import style from './CartRow.module.scss'

interface Props {
  id: string
  title: string
  desc: string
  price: number
  amount: number
}

const CartRow = ({ id, title, desc, price, amount }: Props) => {
  const { cart, addToCart, increment, decrement } = useCartStateStore()

  const handleClick = useDebounce(() => {
    // Your debounced function logic here
    addToCart({ id, title, desc, price }, 1)
  }, 100)

  return (
    <div className={style.menuRow}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.desc}>{price * amount} kr</p>
      <div className={style.price}>
        <p className={style.arrow} onClick={() => increment(id)}>
          &and;
        </p>
        <p>{amount}</p>
        <p className={style.arrow} onClick={() => decrement(id)}>
          &or;
        </p>{' '}
      </div>
    </div>
  )
}

export default CartRow
