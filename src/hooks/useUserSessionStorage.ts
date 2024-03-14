import { useEffect, useState } from 'react'

interface User {
  name: string | null
  email: string | null
  jwtToken: string | null
}

const useUserSessionStorage = (key = 'user') => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = sessionStorage.getItem(key)
    return storedUser
      ? JSON.parse(storedUser)
      : { name: null, email: null, jwtToken: null }
  })

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(key, JSON.stringify(user))
    } else {
      sessionStorage.removeItem(key)
    }
  }, [user, key])

  const updateUser = (name: string, email: string, jwtToken: string) => {
    setUser({ name, email, jwtToken })
  }

  const clearUser = () => {
    setUser({ name: null, email: null, jwtToken: null })
  }

  return { user, updateUser, clearUser } as const
}

export default useUserSessionStorage
