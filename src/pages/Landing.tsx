import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import styles from './Landing.module.scss'
const Landing = () => {
  return (
    <Link to="/menu">
      <div className={styles.wrapper}>
        <img src={logo} alt="Air Bean logotype" />
        <h1 className={styles.pageTitle}>AIR BEAN</h1>
        <h2 className={styles.pageSubTitle}>DRONEDELIVERED COFFEE</h2>
      </div>
    </Link>
  )
}

export default Landing
