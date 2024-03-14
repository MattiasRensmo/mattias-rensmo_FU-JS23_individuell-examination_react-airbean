import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import CartRow from '../components/CartRow'
import useFetch from '../hooks/useFetch'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { CartItem } from '../interfaces/Cart'
import { useCartStateStore } from '../store/useCartStateStore'
import { useModalStateStore } from '../store/useModalStateStore'
import { useOrderStateStore } from '../store/useOrderStateStore'
import style from './Cart.module.scss'

interface LocationState {
  state: {
    background: {
      pathname: string
    }
  }
}

interface OrderObject {
  details: {
    order: {
      name: string
      price: number
    }[]
  }
}

export interface OrderResponse {
  eta: number
  orderNr: string
}

function prepareForOrder(data: CartItem[]): any {
  const coffeeOrder: OrderObject = { details: { order: [] } }

  data.forEach(item => {
    for (let index = 0; index < item.amount; index++) {
      coffeeOrder.details.order.push({ name: item.title, price: item.price })
    }
  })
  return coffeeOrder
}

function Cart() {
  const { cart, emptyCart } = useCartStateStore()
  const { toggleModalVisible } = useModalStateStore()
  const { setOrderEta, setOrderNum } = useOrderStateStore()
  //prettier-ignore
  const {state: { background }} = useLocation() as LocationState
  const navigate = useNavigate()

  const closeModal = () => {
    toggleModalVisible()
    navigate(background.pathname)
  }

  const noClick = (e: React.MouseEvent) => e.stopPropagation()

  // const [loggedIn, setLoggedIn] = useState(false)

  const { user, updateUser, clearUser } = useUserSessionStorage()
  const { placeOrder, checkJWT, loading, error } = useFetch()

  useEffect(() => {
    const token = user.jwtToken
    if (token) {
      checkJWT(token)
        .then((res: any) => {
          if (res.success) {
          }
        })
        .catch((err: any) => {
          console.error('Error checking JWT:', err)
          clearUser()
        })
    }
  }, [])

  const handleClick = () => {
    if (!cart.length) return

    placeOrder(prepareForOrder(cart), user.jwtToken)
      .then(data => {
        setOrderEta(data.eta)
        setOrderNum(data.orderNr)
        emptyCart()
        navigate('/status')
      })
      .catch(err => console.error(err))
  }

  function calcTotal(cart: CartItem[]) {
    return cart.reduce(
      (accumulator, current) => accumulator + current.price * current.amount,
      0
    )
  }

  return (
    <div className={style.modalWrapper} onClick={() => closeModal()}>
      <div className={style.modalContent} onClick={noClick}>
        <h1 className={style.subPageTitle}>Din beställning</h1>
        <div className={style.menuWrapper}>
          <div className={style.menu}>
            {cart.map(item => (
              <CartRow {...item} key={item.id} />
            ))}
          </div>
          <div className={style.cartFooter}>
            <div className={style.totalRow}>
              <p className={style.title}>Total: </p>
              <p>{calcTotal(cart)}</p>
            </div>
            <p className={style.slug}>inkl moms + drönarleverans</p>

            <Button variant="dark" onClick={handleClick}>
              Take my money!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
