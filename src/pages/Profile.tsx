import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HistoryRow from '../components/HistoryRow'
import LoginForm from '../components/LoginForm'
import Fetch from '../hooks/Fetch'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { OrderHistory, OrderHistoryResponse } from '../interfaces/orderHistory'
import style from './Profile.module.scss'

import logo from '../assets/img/logo_dark.svg'
import profilePic from '../assets/img/profile.svg'
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
    if (token) {
      checkJWT(token)
        .then((res: any) => {
          if (res.success) {
            setLoggedIn(true)
            fetchOrderHistory(token)
          }
        })
        .catch((err: any) => {
          console.error('Error checking JWT:', err)
          setLoggedIn(false)
        })
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
      // console.log(data)

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
        <div className={style.contentLoggedIn}>
          <img src={profilePic} alt="Generisk profilbild" />
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          {loading ? (
            <p>Loading order history...</p>
          ) : (
            <div>
              <h2>Orderhistorik</h2>
              {orders?.map(item => (
                <HistoryRow {...item} key={item.orderNr} />
              ))}
              <p>
                Totalt spenderat{' '}
                {orders?.reduce(
                  (accumulator, current) => accumulator + current.total,
                  0
                )}
              </p>
            </div>
          )}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    )
  } else {
    return (
      <div className={style.pageWrapper}>
        <Header></Header>
        <div className={style.contentLoggedOut}>
          <img src={logo} alt="Logotype AirBean" />
          <h1>Välkommen till AirBean-familjen!</h1>
          <p>
            Genom att skapa ett konto nedan kan du spara och se din
            orderhistorik.
          </p>
          <div>
            <input
              type="text"
              placeholder="Namn"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={gdprOk}
                onChange={e => setGdprOk(e.target.checked)}
              />
              GDPR Ok!
            </label>
            <button onClick={handleSignup}>Brew me a cup!</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
