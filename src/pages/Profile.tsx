import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HistoryRow from '../components/HistoryRow'

import Fetch from '../hooks/Fetch'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { OrderHistory, OrderHistoryResponse } from '../interfaces/orderHistory'
import style from './Profile.module.scss'

import logo from '../assets/img/logo_dark.svg'
import profilePic from '../assets/img/profile.svg'
import Button from '../components/Button'
import { useLoggedInStateStore } from '../store/useLoggedInStateStore'

const Profile: React.FC = () => {
  const { loggedIn, setLoggedIn } = useLoggedInStateStore()

  const [orders, setOrders] = useState<OrderHistory[]>()

  const { user, updateUser, clearUser } = useUserSessionStorage()
  const { login, signup, getOrderHistory, checkJWT, loading, error } = Fetch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gdprOk, setGdprOk] = useState(false)

  const [nameTouched, setNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const [nameOk, setNameOk] = useState(false)
  const [emailOk, setEmailOk] = useState(false)
  const [passwordOk, setPasswordOk] = useState(false)

  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  useEffect(() => setNameOk(name.length > 4), [name])
  useEffect(() => setEmailOk(emailRegExp.test(email)), [email])
  useEffect(() => setPasswordOk(password.length > 4), [password])

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
    } else {
      setLoggedIn(false)
    }
  }, [user])

  const handleLogin = async () => {
    try {
      const data = await login({ username: email, password })

      await updateUser(name, email, data.token)
    } catch (err) {
      console.error('Error logging in:', err)
    }
  }

  const handleSignup = async () => {
    try {
      await signup({ username: email, password })
      handleLogin()
    } catch (err) {
      console.error('Error signing up:', err)
    }
  }

  const fetchOrderHistory = async (JWT: string) => {
    try {
      const data: OrderHistoryResponse = await getOrderHistory(JWT)
      data.success ? setOrders(data.orderHistory) : setOrders([])
    } catch (err) {
      console.error('Error fetching order history:', err)
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
          {error && <p>{JSON.stringify(error)}</p>}
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
            <label htmlFor="name">
              Namn
              {nameTouched && !nameOk && (
                <span className={style.alert}> &nbsp; ange ditt namn</span>
              )}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
            />
            <label htmlFor="email">
              Epost
              {emailTouched && !emailOk && (
                <span className={style.alert}> &nbsp; ange riktig epost</span>
              )}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            <label htmlFor="password">
              Lösenord
              {passwordTouched && !passwordOk && (
                <span className={style.alert}> &nbsp; för kort lösenord</span>
              )}
            </label>
            <input
              type="password"
              // placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            <span className={style.gdprBox}>
              <input
                id="gdprOk"
                type="checkbox"
                checked={gdprOk}
                onChange={e => setGdprOk(e.target.checked)}
              />
              <label htmlFor="gdprOk">GDPR Ok!</label>
            </span>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <Button
              variant="dark"
              disabled={!nameOk || !emailOk || !passwordOk || !gdprOk}
              onClick={handleSignup}>
              Brew me a cup!
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
