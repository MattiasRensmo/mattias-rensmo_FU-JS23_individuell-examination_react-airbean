import CartButton from '../components/CartButton'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuRow from '../components/MenuRow'
import NavButton from '../components/NavButton'
import useFetch from '../hooks/useFetch'
import { CoffeeMenu } from '../interfaces/CoffeeMenu'
import style from './Menu.module.scss'

const Menu = () => {
  const { data, loading, error } = useFetch<CoffeeMenu>(
    'https://airbean-api-xjlcn.ondigitalocean.app/api/beans/'
  )

  return (
    <div className={style.pageWrapper}>
      <Header>
        <NavButton />
        <CartButton />
      </Header>
      <main className={style.content}>
        <h1>Meny</h1>
        {loading && 'Laddar menyn...'}
        {(error || !data?.success) && 'Något gick fel, försök igen senare'}
        {data && data.success && (
          <div className={style.menu}>
            {' '}
            {data.menu.map(item => (
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
