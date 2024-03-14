import { useState } from 'react'

function useFetch() {
  const baseUrl = 'https://airbean-api-xjlcn.ondigitalocean.app'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async (url: string, options?: RequestInit) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred')
      }

      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMenu = async () => {
    return handleFetch(`${baseUrl}/api/beans`)
  }

  const placeOrder = async (orderData: any, JWT: string | null) => {
    return handleFetch(`${baseUrl}/api/beans/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(JWT && { Authorization: `Bearer ${JWT}` }),
      },
      body: JSON.stringify(orderData),
    })
  }

  const getOrderStatus = async (orderNr: string, JWT: string | null) => {
    return handleFetch(`${baseUrl}/api/beans/order/status/${orderNr}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(JWT && { Authorization: `Bearer ${JWT}` }),
      },
    })
  }

  const signup = async (userData: any) => {
    return handleFetch(`${baseUrl}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
  }

  const login = async (loginData: any) => {
    return handleFetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
  }

  const getOrderHistory = async (JWT: string) => {
    return handleFetch(`${baseUrl}/api/user/history`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    })
  }

  const checkJWT = async (JWT: string) => {
    const status = await handleFetch(`${baseUrl}/api/user/status`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    })
    return status
  }

  return {
    getMenu,
    placeOrder,
    getOrderStatus,
    signup,
    login,
    getOrderHistory,
    checkJWT,
    loading,
    error,
  }
}

export default useFetch
