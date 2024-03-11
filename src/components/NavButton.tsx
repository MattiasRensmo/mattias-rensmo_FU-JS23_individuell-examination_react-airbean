import React, { useState } from 'react'
import { useModalStateStore } from '../store/useModalStateStore'
import closeIcon from './../assets/img/icons/close.svg'
import menuIcon from './../assets/img/icons/navicon.svg'
import Nav from './Nav'
import style from './NavButton.module.scss'

type Props = {}

const NavButton = (props: Props) => {
  // const [visible, setVisible] = useState(false)
  const { modalVisible, toggleModalVisible: toggleVisible } =
    useModalStateStore()
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
