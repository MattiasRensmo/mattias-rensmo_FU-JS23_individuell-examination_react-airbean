import { NavLink } from 'react-router-dom'
import { useModalStateStore } from '../store/useModalStateStore'
import { useNavStateStore } from '../store/useNavStateStore'
import close from './../assets/img/icons/close.svg'
import style from './Nav.module.scss'

const Nav = () => {
  const { setNavVisible } = useNavStateStore()
  const { setModalVisible } = useModalStateStore()

  return (
    <div className={style.pageWrapper}>
      <header className={style.header}>
        <img
          src={close}
          onClick={() => {
            setNavVisible(false)
            setModalVisible(false)
          }}
        />
      </header>

      <menu className={style.content}>
        <li className={style.navItem}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to="/menu">
            Meny
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to="/about">
            Vårt kaffe
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to="/profile">
            Min profil
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to="/status">
            Orderstatus
          </NavLink>
        </li>
      </menu>
    </div>
  )
}

export default Nav
