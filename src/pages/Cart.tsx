import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CartRow from '../components/CartRow'
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

function prepareForOrder(data: CartItem[]): string {
  const coffeeOrder: OrderObject = { details: { order: [] } }

  data.forEach(item => {
    for (let index = 0; index < item.amount; index++) {
      coffeeOrder.details.order.push({ name: item.title, price: item.price })
    }
  })
  return JSON.stringify(coffeeOrder)
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

  const handleClick = () => {
    if (!cart.length) return
    const abortController = new AbortController()

    fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order', {
      signal: abortController.signal,
      method: 'POST',
      body: prepareForOrder(cart),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setOrderEta(data.eta)
        setOrderNum(data.orderNr)
        emptyCart()
        navigate('/status')
      })
      .catch(err => console.log(err))
    //Avbryt så vi endast gör en order
    return () => abortController.abort()
  }

  return (
    <div className={style.modalWrapper} onClick={() => closeModal()}>
      <div className={style.modalContent} onClick={noClick}>
        <div className={style.menu}>
          {cart.map(item => (
            <CartRow {...item} key={item.id} />
          ))}
        </div>
        <p>
          Total:{' '}
          {cart.reduce((accumulator, current) => accumulator + current.price * current.amount, 0)}
        </p>
        <p>inkl moms + drönarleverans</p>
        <button onClick={handleClick}>Take my money!</button>
      </div>
    </div>
  )
}
export default Cart
