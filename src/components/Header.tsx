import { ReactNode, useState } from 'react'

import style from './Header.module.scss'
// import Nav from './Nav'

type Props = {
  children: ReactNode
}

const Header = (props: Props) => {
  // const toggleNav = () => setNavVisible(pre => !pre)

  // const [navVisible, setNavVisible] = useState(false)
  return (
    <>
      {/* {navVisible && <Nav />} */}
      <header className={style.wrapper}>{props.children}</header>
    </>
  )
}
export default Header
