import { useEffect, useState } from 'react'
import CartButton from '../components/CartButton'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuRow from '../components/MenuRow'
import Fetch from '../hooks/Fetch'
import useFetch from '../hooks/useFetch'
import { CoffeeMenu } from '../interfaces/CoffeeMenu'
import { useModalStateStore } from '../store/useModalStateStore'
import style from './Menu.module.scss'

const Menu = () => {
  const { modalVisible } = useModalStateStore()

  const { getMenu, loading, error } = Fetch() // Initialize the Fetch hook
  const [menu, setMenu] = useState<any[]>([])

  useEffect(() => {
    getMenu()
      .then((menuData: CoffeeMenu) => {
        setMenu(menuData.menu)
      })
      .catch((error: any) => {
        console.error('Error fetching menu:', error)
      })
  }, [])

  return (
    <div className={style.pageWrapper}>
      <Header>
        <CartButton />
      </Header>
      <main className={style.content}>
        <h1 className={style.subPageTitle}>Meny</h1>
        {loading && 'Laddar menyn...'}
        {error && 'Något gick fel, försök igen senare'}
        {menu && (
          <div className={style.menu}>
            {' '}
            {menu.map(item => (
              <MenuRow {...item} key={item.id} />
            ))}{' '}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Menu
