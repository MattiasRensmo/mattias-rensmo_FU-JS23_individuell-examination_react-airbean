import { ReactNode, useEffect } from 'react'

import { useModalStateStore } from '../store/useModalStateStore'
import { useNavStateStore } from '../store/useNavStateStore'
import style from './Header.module.scss'
import Nav from './Nav'
import NavButton from './NavButton'

type Props = {
  children?: ReactNode
}

const Header = (props: Props) => {
  const { modalVisible, setModalVisible } = useModalStateStore()

  const { navVisible, setNavVisible } = useNavStateStore()

  useEffect(() => {
    setNavVisible(false)
    setModalVisible(false)
  }, [])

  useEffect(() => {
    modalVisible
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [modalVisible])

  if (navVisible) return <Nav />
  return (
    <header className={style.wrapper}>
      <div className={style.content}>
        <div onClick={() => setNavVisible(true)}>
          <NavButton />
        </div>
        {props.children}
      </div>
    </header>
  )
}
export default Header
