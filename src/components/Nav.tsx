import { Link } from 'react-router-dom'
import { useNavStateStore } from '../store/useNavStateStore'
import close from './../assets/img/icons/close.svg'
import style from './Nav.module.scss'

const Nav = () => {
  const { toggleVisible } = useNavStateStore()
  return (
    <div className={style.pageWrapper}>
      <header className={style.header}>
        <img src={close} onClick={toggleVisible} />
      </header>
      <nav className={style.content}>
        <li className={style.navItem}>
          <Link to="/menu" onClick={toggleVisible}>
            Meny
          </Link>
        </li>
        <li className={style.navItem}>
          <Link to="/about" onClick={toggleVisible}>
            Vårt kaffe
          </Link>
        </li>
        <li className={style.navItem}>
          <Link to="/profile" onClick={toggleVisible}>
            Min profil
          </Link>
        </li>
        <li className={style.navItem}>
          <Link to="/status" onClick={toggleVisible}>
            Orderstatus
          </Link>
        </li>
      </nav>
    </div>
  )
}

export default Nav
