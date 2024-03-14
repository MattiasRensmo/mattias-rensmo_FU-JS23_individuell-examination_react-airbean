import plus from '../assets/img/icons/plus.svg'
import useDebounce from '../hooks/useDebounce'
import { useCartStateStore } from '../store/useCartStateStore'
import style from './MenuRow.module.scss'

interface Props {
  id: string
  title: string
  desc: string
  price: number
}

const MenuRow = ({ id, title, desc, price }: Props) => {
  const { addToCart } = useCartStateStore()

  const handleClick = useDebounce(() => {
    addToCart({ id, title, desc, price }, 1)
  }, 100)

  return (
    <div className={style.menuRow}>
      <div className={style.add}>
        <img src={plus} alt="addToCart" onClick={handleClick} />
      </div>
      <h3 className={style.title}>{title}</h3>
      <p className={style.desc}>{desc}</p>
      <p className={style.price}>{price} kr</p>
    </div>
  )
}

export default MenuRow
