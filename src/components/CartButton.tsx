import { useLocation, useNavigate } from 'react-router-dom'
import { useCartStateStore } from '../store/useCartStateStore'
import { useModalStateStore } from '../store/useModalStateStore'
import cartIcon from './../assets/img/icons/cart2.svg'
import style from './CartButton.module.scss'

const CartButton = () => {
  const { numItems } = useCartStateStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { toggleModalVisible } = useModalStateStore()
  const handleClick = () => {
    toggleModalVisible()
    navigate('/cart', { state: { background: location } })
  }

  return (
    <div className={style.container}>
      {numItems > 0 && (
        <div className={style.numItemsBackground}>
          {' '}
          <p className={style.numItems}>{numItems}</p>{' '}
        </div>
      )}
      <img
        src={cartIcon}
        alt="Cart"
        className={style.menuIcon}
        onClick={handleClick}
      />
    </div>
  )
}

export default CartButton
