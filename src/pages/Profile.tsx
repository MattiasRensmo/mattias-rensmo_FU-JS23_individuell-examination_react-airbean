import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HistoryRow from '../components/HistoryRow'
import LoginForm from '../components/LoginForm'
import Fetch from '../hooks/Fetch'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { OrderHistory, OrderHistoryResponse } from '../interfaces/orderHistory'
import style from './Profile.module.scss'

import { Link } from 'react-router-dom'
import logo from '../assets/img/logo_dark.svg'
import profilePic from '../assets/img/profile.svg'
import Button from '../components/Button'
import { useLoggedInStateStore } from '../store/useLoggedInStateStore'

const Profile: React.FC = () => {
  // const [user, setUser] = useState<any>(null)
  // const [loggedIn, setLoggedIn] = useState(false)
  const { loggedIn, setLoggedIn } = useLoggedInStateStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderHistory[]>()

  const [user, updateUser, clearUser] = useUserSessionStorage()
  const { login, signup, getOrderHistory, checkJWT } = Fetch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gdprOk, setGdprOk] = useState(false)

  useEffect(() => {
    const token = user.jwtToken
    console.log('token', token)

    if (token) {
      checkJWT(token)
        .then((res: any) => {
          console.log('res check token', res)

          if (res.success) {
            setLoggedIn(true)
            fetchOrderHistory(token)
            setError(null)
          }
        })
        .catch((err: any) => {
          console.error('Error checking JWT:', err)
          setLoggedIn(false)
        })
    } else {
      setLoggedIn(false)
    }
  }, [user])

  const handleLogin = async () => {
    try {
      setLoading(true)
      const data = await login({ username: email, password })
      console.log(data)
      await updateUser(name, email, data.token)
      console.log(name, email, data.token)

      // fetchOrderHistory(data.token)
    } catch (err) {
      console.error('Error logging in:', err)
      setError('Error logging in')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    try {
      setLoading(true)
      const data = await signup({ username: email, password })
      console.log(data)
      handleLogin()
    } catch (err) {
      console.error('Error signing up:', err)
      setError('Error signing up')
    } finally {
      setLoading(false)
    }
  }

  //TODO flytta error o loading - hanteringen tillbaka till Fetch.ts
  const fetchOrderHistory = async (JWT: string) => {
    try {
      setLoading(true)
      const data: OrderHistoryResponse = await getOrderHistory(JWT)
      console.log('orderhistorik', data)

      data.success ? setOrders(data.orderHistory) : setOrders([])
    } catch (err) {
      console.error('Error fetching order history:', err)
      setError('Error fetching order history')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    clearUser()
  }

  if (loggedIn) {
    return (
      <div className={style.pageWrapper}>
        <Header></Header>
        <div className={[style.contentLoggedIn, style.content].join(' ')}>
          <a className={style.logoutText} onClick={handleLogout}>
            Logout
          </a>
          <img src={profilePic} alt="Generisk profilbild" />
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          {loading ? (
            <p>Loading order history...</p>
          ) : (
            <>
              <h2>Orderhistorik</h2>
              <div className={style.orderHistoryTable}>
                {orders?.map(item => (
                  <HistoryRow {...item} key={item.orderNr} />
                ))}
                <p className={style.totalLine}>Totalt spenderat</p>
                <p className={style.totalLine} style={{ textAlign: 'right' }}>
                  {orders?.reduce(
                    (accumulator, current) => accumulator + current.total,
                    0
                  )}{' '}
                  kr
                </p>
              </div>
            </>
          )}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    )
  } else {
    return (
      <div className={style.pageWrapper}>
        <Header></Header>
        <div className={[style.contentLoggedOut, style.content].join(' ')}>
          <img src={logo} alt="Logotype AirBean" />
          <h1>
            Välkommen till
            <br /> AirBean-familjen!
          </h1>
          <p>
            Genom att skapa ett konto nedan kan du spara och se din
            orderhistorik.
          </p>
          <div className={style.form}>
            <label htmlFor="name">Namn</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="email">Epost</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              // placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span>
              <input
                id="gdprOk"
                type="checkbox"
                checked={gdprOk}
                onChange={e => setGdprOk(e.target.checked)}
              />
              <label htmlFor="gdprOk">GDPR Ok!</label>
            </span>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {/* <button onClick={handleSignup}>Brew me a cup!</button> */}
            <Button variant="dark" onClick={handleSignup}>
              Brew me a cup!
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
