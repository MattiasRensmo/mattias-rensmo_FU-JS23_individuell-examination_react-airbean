import { create } from 'zustand'
import '../interfaces/CoffeeMenu'
import { CoffeeMenuItem } from '../interfaces/CoffeeMenu'

interface CartItem extends CoffeeMenuItem {
  amount: number
}

interface Cart {
  cart: CartItem[]
  numItems: number
  addToCart: (product: CoffeeMenuItem, amount: number) => void
}

export const useCartStateStore = create<Cart>()(set => ({
  cart: [],
  numItems: 0,
  addToCart: (product, amount) =>
    set(currentState => {
      // console.log('adding to state', product)

      const existingItemIndex = currentState.cart.findIndex(
        item => item.id === product.id
      )
      //Om vi inte i hittade inget
      if (existingItemIndex !== -1) {
        const updatedCart = [...currentState.cart]
        updatedCart[existingItemIndex].amount += amount

        return {
          cart: updatedCart,
          numItems: (currentState.numItems += amount),
        }
      } else {
        // currentState.numItems += amount
        return {
          cart: [...currentState.cart, { ...product, amount }],
          numItems: (currentState.numItems += amount),
        }
      }
    }),
}))
