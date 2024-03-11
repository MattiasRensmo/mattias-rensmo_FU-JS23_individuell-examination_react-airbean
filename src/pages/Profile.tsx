import React, { useEffect, useState } from 'react'
import HistoryRow from '../components/HistoryRow'
import Fetch from '../hooks/Fetch' // Assuming the Fetch.ts file is in the same directory
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { OrderHistory, OrderHistoryResponse } from '../interfaces/orderHistory'

interface Order {
  id: string
  // Add other properties of an order as needed
}

const Profile: React.FC = () => {
  // const [user, setUser] = useState<any>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gdprOk, setGdprOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderHistory[]>()

  const [user, updateUser, clearUser] = useUserSessionStorage()
  const { login, signup, getOrderHistory, checkJWT } = Fetch()

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
  }, [])

  const fetchOrderHistory = async (JWT: string) => {
    try {
      setLoading(true)
      const data: OrderHistoryResponse = await getOrderHistory(JWT)
      console.log(data)

      data.success ? setOrders(data.orderHistory) : setOrders([])
    } catch (err) {
      console.error('Error fetching order history:', err)
      setError('Error fetching order history')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      console.log('Tut')

      setLoading(true)
      const data = await login({ username: email, password })
      console.log(data)
      updateUser(name, email, data.token)
      setLoggedIn(true)
      fetchOrderHistory(data.token)
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

  const handleLogout = () => {
    setLoggedIn(false)
    clearUser()
  }

  if (loggedIn) {
    return (
      <div>
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
              {orders?.reduce((accumulator, current) => accumulator + current.total, 0)}
            </p>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    )
  } else {
    return (
      <div>
        <h1>Create Account / Log In</h1>
        <input
          type="text"
          placeholder="Name"
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
          <input type="checkbox" checked={gdprOk} onChange={e => setGdprOk(e.target.checked)} />
          GDPR Ok!
        </label>
        <button onClick={handleSignup}>Create Account / Log In</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    )
  }
}

export default Profile
