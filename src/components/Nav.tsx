import { Link } from 'react-router-dom'
import { useModalStateStore } from '../store/useModalStateStore'
import close from './../assets/img/icons/close.svg'
import style from './Nav.module.scss'

interface Props {
  toggle: () => void
}

const Nav = ({ toggle }: Props) => {
  // const { toggleModalVisible, modalVisible } = useModalStateStore()

  return (
    <div className={style.pageWrapper}>
      <header className={style.header}>
        <img src={close} onClick={toggle} />
      </header>

      <menu className={style.content}>
        <li className={style.navItem}>
          <Link to="/menu">Meny</Link>
        </li>
        <li className={style.navItem}>
          <Link to="/about">Vårt kaffe</Link>
        </li>
        <li className={style.navItem}>
          <Link to="/profile">Min profil</Link>
        </li>
        <li className={style.navItem}>
          <Link to="/status">Orderstatus</Link>
        </li>
      </menu>
    </div>
  )
}

export default Nav
