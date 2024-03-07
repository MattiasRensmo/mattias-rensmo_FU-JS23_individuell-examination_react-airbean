import { useCartStateStore } from '../store/useCartStateStore'
import cartIcon from './../assets/img/icons/cart2.svg'
import style from './CartButton.module.scss'

type Props = {}

const CartButton = (props: Props) => {
  const { numItems } = useCartStateStore()

  return (
    <div className={style.container}>
      {numItems > 0 && <p className={style.numItems}>{numItems}</p>}
      <img
        src={cartIcon}
        alt="Cart"
        className={style.menuIcon}
        onClick={() => console.log('Toggle cart')}
      />
    </div>
  )
}

export default CartButton
