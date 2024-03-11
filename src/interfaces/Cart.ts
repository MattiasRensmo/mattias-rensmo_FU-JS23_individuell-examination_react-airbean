import { CoffeeMenuItem } from '../interfaces/CoffeeMenu'

export interface CartItem extends CoffeeMenuItem {
  amount: number
}
export interface Cart {
  cart: CartItem[]
  numItems: number
  addToCart: (product: CoffeeMenuItem, amount: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  emptyCart: () => void
}
