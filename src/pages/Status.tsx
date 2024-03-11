import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import drone from '../assets/img/drone.svg'
import { useOrderStateStore } from '../store/useOrderStateStore'
import style from './Status.module.scss'

const Status = () => {
  const { orderEta, orderNum, setOrderNum, setOrderEta } = useOrderStateStore()
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (!orderEta) {
      setOrderNum(null)
      return
    }

    const updateEta = () => {
      fetch(`https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/${orderNum}`)
        .then(res => res.json())
        .then(data => {
          setOrderEta(data.eta)
          console.log('Fetched new ETA', data.eta)
        })
        .catch(error => console.log(error))
    }

    const interval = setInterval(() => {
      if (orderEta <= 0) clearInterval(interval)
      setCount(pre => pre + 1)
    }, 60000)

    //Run when page loads, and every minute
    updateEta()

    return () => clearInterval(interval)
  }, [count])

  if (orderNum)
    return (
      <main className={style.noHeaderWrapper}>
        <p>Counter: {count}</p>
        <p>Ordernummer {orderNum}</p>
        <img src={drone} alt="Drönare" />
        <h1>Din beställning är på väg!</h1>
        <p>Eta: {orderEta}</p>
        <button onClick={() => navigate('/')}>Ok, cool!</button>
      </main>
    )
  return (
    <main className={style.noHeaderWrapper}>
      <h1>Det finns ingen pågående beställning!</h1>
      <button onClick={() => navigate('/menu')}>Gör en beställning</button>
    </main>
  )
}

export default Status
