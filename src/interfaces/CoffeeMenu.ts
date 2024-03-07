export interface CoffeeMenu {
  success: boolean
  menu: CoffeeMenuItem[]
}

export interface CoffeeMenuItem {
  id: string
  title: string
  desc: string
  price: number
}
