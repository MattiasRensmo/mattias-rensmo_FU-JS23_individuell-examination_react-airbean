import { ReactNode, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { useModalStateStore } from '../store/useModalStateStore'
import { useNavStateStore } from '../store/useNavStateStore'
import style from './Header.module.scss'
import Nav from './Nav'
import NavButton from './NavButton'
// import Nav from './Nav'

type Props = {
  children?: ReactNode
}

const Header = (props: Props) => {
  const { toggleModalVisible, modalVisible, setModalVisible } =
    useModalStateStore()

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
      <div onClick={() => setNavVisible(true)}>
        <NavButton />
      </div>
      {props.children}
    </header>
  )
}
export default Header
