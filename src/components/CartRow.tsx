import { useCartStateStore } from '../store/useCartStateStore'
import style from './CartRow.module.scss'

interface Props {
  id: string
  title: string
  desc: string
  price: number
  amount: number
}

const CartRow = ({ id, title, price, amount }: Props) => {
  const { increment, decrement } = useCartStateStore()

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
