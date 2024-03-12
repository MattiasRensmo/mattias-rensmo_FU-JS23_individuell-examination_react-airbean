import React, { useEffect, useState } from 'react'
import Fetch from '../hooks/Fetch'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import { useLoggedInStateStore } from '../store/useLoggedInStateStore'

const LoginForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gdprOk, setGdprOk] = useState(false)

  const [user, updateUser, clearUser] = useUserSessionStorage()
  const { login, signup, getOrderHistory, checkJWT } = Fetch()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { loggedIn, setLoggedIn } = useLoggedInStateStore()

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

  return (
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
  )
}

export default LoginForm
