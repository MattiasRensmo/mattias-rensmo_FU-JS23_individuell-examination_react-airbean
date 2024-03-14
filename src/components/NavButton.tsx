import { useModalStateStore } from '../store/useModalStateStore'
import menuIcon from './../assets/img/icons/navicon.svg'
import style from './NavButton.module.scss'

const NavButton = () => {
  const { toggleModalVisible: toggleVisible } = useModalStateStore()
  return (
    <>
      <img
        src={menuIcon}
        alt="Menu"
        className={style.menuIcon}
        onClick={toggleVisible}
      />
    </>
  )
}

export default NavButton
