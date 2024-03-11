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
  // const { data, loading, error } = useFetch<CoffeeMenu>(
  //   'https://airbean-api-xjlcn.ondigitalocean.app/api/beans/'
  // )
  const { modalVisible } = useModalStateStore()

  //TEST
  const { getMenu, loading, error } = Fetch() // Initialize the Fetch hook
  const [menu, setMenu] = useState<any[]>([])

  useEffect(() => {
    // Fetch the menu when the component mounts
    getMenu()
      .then((menuData: CoffeeMenu) => {
        // Update the state with the fetched menu data
        console.log(menuData)

        setMenu(menuData.menu)
      })
      .catch((error: any) => {
        console.error('Error fetching menu:', error)
      })
  }, []) // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className={modalVisible ? style.pageWrapper + 'noScroll' : style.pageWrapper}>
      <Header>
        <CartButton />
      </Header>
      <main className={style.content}>
        <h1>Meny</h1>
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
