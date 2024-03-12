import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo_dark.svg'
import profilePic from '../assets/img/profile.svg'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import style from './Profile.module.scss'

type Props = {}

async function checkJWT(url: string, JWT: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    })
    const json: any = await response.json()
    console.log(json)

    return { success: json.success }
  } catch (err) {
    return { success: false, message: err }
  }
}

const Profile = (props: Props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, updateUser, clearUser] = useUserSessionStorage()
  const [JWT, setJWT] = useState<string | null>(null)
  console.log(user)

  useEffect(() => {
    //Så fort sidan renderas, avbryt om vi inte ens har en user
    if (!user) return

    //Om vi har en sparad user - men inte en sparad JWT avbryt
    if (!user.jwtToken) return

    //Då har vi en JWT - lägg i local state för enklare kontroll på den

    setJWT(user.jwtToken)

    //Om vi har en JWT - kolla om den fortfarande är giltig
    if (JWT !== null)
      checkJWT('https://airbean-api-xjlcn.ondigitalocean.app/api/user/status', JWT).then(res => {
        //Om den fortfarande är giltig sätt state loggedIn = true
        setLoggedIn(res.success)
        console.log(res)

        //Radera JWT om den inte är giltig
        if (!res.success) clearUser()
      })
  }, [user, loggedIn])

  return (
    <div className={style.pageWrapper}>
      <Header></Header>
      {!loggedIn ? (
        <main className={style.contentLoggedOut}>
          <img src={logo} alt="Logotype AirBean" />
          <h1>Välkommen till AirBean-familjen!</h1>
          <p>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
          <LoginForm />
        </main>
      ) : (
        <main className={style.contentLoggedIn}>
          <img src={profilePic} alt="Logotype AirBean" />
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <h2>Orderhistorik</h2>
        </main>
      )}
    </div>
  )
}

export default Profile
