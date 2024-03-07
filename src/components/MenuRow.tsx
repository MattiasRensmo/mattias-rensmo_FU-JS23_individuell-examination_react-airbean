import plus from '../assets/img/icons/plus.svg'
import { useCartStateStore } from '../store/useCartStateStore'
import style from './MenuRow.module.scss'

interface Props {
  id: string
  title: string
  desc: string
  price: number
}

const MenuRow = ({ id, title, desc, price }: Props) => {
  // const { visible, toggleVisible } = useNavStateStore()
  const { cart, addToCart } = useCartStateStore()

  return (
    <div className={style.menuRow}>
      <div className={style.add}>
        <img
          src={plus}
          alt="addToCart"
          onClick={() => addToCart({ id, title, desc, price }, 1)}
        />
      </div>
      <h3 className={style.title}>{title}</h3>
      <p className={style.desc}>{desc}</p>
      <p className={style.price}>{price} kr</p>
    </div>
  )
}

export default MenuRow
