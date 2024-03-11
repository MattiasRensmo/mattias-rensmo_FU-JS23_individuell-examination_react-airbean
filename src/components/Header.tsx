import { ReactNode, useState } from 'react'

import style from './Header.module.scss'
import Nav from './Nav'
import NavButton from './NavButton'
// import Nav from './Nav'

type Props = {
  children?: ReactNode
}

const Header = (props: Props) => {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => setNavOpen(pre => !pre)

  if (navOpen) return <Nav toggle={toggleNav} />
  return (
    <header className={style.wrapper}>
      <div onClick={toggleNav}>
        <NavButton />
      </div>
      {props.children}
    </header>
  )
}
export default Header
