import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import drone from '../assets/img/drone.svg'
import Button from '../components/Button'
import Fetch from '../hooks/Fetch'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { useOrderStateStore } from '../store/useOrderStateStore'
import style from './Status.module.scss'

const Status = () => {
  const { user, clearUser } = useUserSessionStorage()
  const { orderEta, orderNum, setOrderNum, setOrderEta, decrementOrderEta } =
    useOrderStateStore()
  const navigate = useNavigate()

  // TEST
  const { getOrderStatus, checkJWT, loading, error } = Fetch() // Initialize the Fetch hook

  useEffect(() => {
    // OM vi har JWT sparad - kolla att den fortfarande gäller - annars tar vi bort den
    // TODO Kolla att det är Error 401 för att vi ska ta bort - annars borde vi visa error
    if (user.jwtToken) checkJWT(user.jwtToken).catch(() => clearUser())

    if (!orderNum) return setOrderEta(0)
    getOrderStatus(orderNum, user.jwtToken)
      .then((statusData: any) => {
        //Vi får bara tillbaka eta om det finns en nedräkning (annars får vi message)
        statusData.eta ? setOrderEta(statusData.eta) : setOrderNum(null)
      })
      .catch((error: any) => {
        console.error('Error fetching order status:', error)
      })
  }, [orderNum])

  useEffect(() => {
    //TODO Trevligt om detta vore en custom hook kanske?
    // Vi räknar själva för att inte behöva ringa API:et varje minut - tänk på bandbredden
    const interval = setInterval(() => {
      if (orderEta <= 0) {
        clearInterval(interval)
      } else {
        decrementOrderEta(1)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [orderEta])

  const orderContent = (
    <>
      <p className={style.translucent}>
        Ordernummer <span className={style.bold}>#{orderNum}</span>
      </p>
      <img src={drone} alt="Drönare" />
      <h1>Din beställning är på väg!</h1>
      <p className={style.large}>
        <span className={style.bold}>{orderEta}</span> minuter
      </p>
      <Button variant="light" onClick={() => navigate('/')}>
        Ok, cool!
      </Button>
    </>
  )

  const noOrderContent = (
    <>
      <img src={drone} alt="Drönare" />
      <h1 style={{ textAlign: 'center' }}>
        Hittar ingen pågående beställning!
      </h1>
      <Button variant="light" onClick={() => navigate('/menu')}>
        Order something!
      </Button>
    </>
  )

  return (
    <main className={style.noHeaderWrapper}>
      {loading ? (
        <p>Laddar sidan...</p>
      ) : error ? (
        <p>Något gick fel =( {error}</p>
      ) : orderNum ? (
        orderContent
      ) : (
        noOrderContent
      )}
    </main>
  )
}

export default Status
