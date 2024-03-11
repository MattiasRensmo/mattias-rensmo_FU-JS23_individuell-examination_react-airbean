import { create } from 'zustand'
import { Cart } from '../interfaces/Cart'
import '../interfaces/CoffeeMenu'

//TODO Det hade varit fint med en added-nyckel så man kan sortera efter när något lades till för första gången i listan
export const useCartStateStore = create<Cart>()(set => ({
  cart: [],
  numItems: 0,
  addToCart: (product, amount) =>
    set(currentState => {
      // console.log('adding to state', product)

      const existingItemIndex = currentState.cart.findIndex(item => item.id === product.id)
      //Om vi inte hittade inget
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
  increment: id =>
    set(currentState => {
      const existingItemIndex = currentState.cart.findIndex(item => item.id === id)
      //Om vi inte hittade inget
      if (existingItemIndex !== -1) {
        const updatedCart = [...currentState.cart]
        updatedCart[existingItemIndex].amount += 1

        return {
          cart: updatedCart,
          numItems: (currentState.numItems += 1),
        }
      }
      //Gör inget som fallback om vi inte hittar rätt index
      return currentState
    }),
  decrement: id =>
    set(currentState => {
      const existingItemIndex = currentState.cart.findIndex(item => item.id === id)
      //Om vi inte hittade inget
      if (existingItemIndex !== -1) {
        let updatedCart = [...currentState.cart]
        updatedCart[existingItemIndex].amount -= 1

        if (updatedCart[existingItemIndex].amount < 1) {
          const cartNoZero = updatedCart.filter(item => item.amount > 0)
          updatedCart = cartNoZero
        }

        return {
          cart: updatedCart,
          numItems: (currentState.numItems -= 1),
        }
      }
      //Gör inget som fallback om vi inte hittar rätt index
      return currentState
    }),
  emptyCart: () => set(() => ({ cart: [], numItems: 0 })),
}))
