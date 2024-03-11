import { ChangeEvent, FormEvent, useState } from 'react'
import useUserSessionStorage from '../hooks/useUserSessionStorage'
import style from './LoginForm.module.scss'

interface ApiLoginFail {
  success: false
  message: string
}

interface ApiLoginSucces {
  success: true
  token: string
}

type ApiLoginResponse = ApiLoginFail | ApiLoginSucces

interface LoginToken {
  success: boolean
  message: string
}

async function fetchPost(url: string, mail: string, password: string) {
  try {
    const response = await fetch(url, {
      body: JSON.stringify({ username: mail, password }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json: ApiLoginResponse = await response.json()
    return { success: json.success, message: json.success ? json.token : json.message }
  } catch (err) {
    return { success: false, message: 'Something went wrong' }
  }
}

async function loginOrCreateAccount(mail: string, password: string): Promise<LoginToken> {
  // TODO Validate email
  // ! TODO !! Validate password API kräver att lösen är minst 5 tecken

  //Först testar vi att skapa ett konto
  const create: LoginToken = await fetchPost(
    'https://airbean-api-xjlcn.ondigitalocean.app/api/user/signup',
    mail,
    password
  )

  if (create.success) {
    console.log(`Skapade konto för `, mail)
  }
  if (!create.success) {
    console.log(`Kunde inte skapa konto`, create)
  }

  //Oavsett hur det går försöker vi sen logga in
  const { success, message } = await fetchPost(
    'https://airbean-api-xjlcn.ondigitalocean.app/api/user/login',
    mail,
    password
  )
  return { success, message }
}

const LoginForm = () => {
  //Form-data
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [gdprOk, setGdprOk] = useState(false)

  //Session storage
  const [user, updateUser, clearUser] = useUserSessionStorage()
  // const [loggedIn, setLoggedIn] = useState(false)
  const [logInMessage, setLogInMessage] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearUser()
    loginOrCreateAccount(mail, password).then((token: LoginToken) => {
      console.log(token)

      if (token && token.success) {
        updateUser(name, mail, token.message)
        setLogInMessage('')
      } else {
        setLogInMessage(token.message)
      }
    })
  }

  return (
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <label htmlFor="loginName">Namn</label>
      <input
        type="text"
        id="loginName"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />

      <label htmlFor="loginMail">Epost</label>
      <input
        type="text"
        id="loginMail"
        value={mail}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
      />

      <label htmlFor="loginPassword">Lösenord</label>
      <input
        type="password"
        id="loginPassword"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      <span>
        <input
          type="checkbox"
          id="loginGdpr"
          checked={gdprOk}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setGdprOk(e.target.checked)}
        />
        <label htmlFor="loginGdpr">GDPR Ok!</label>
      </span>

      <button type="submit">BREW ME A CUP</button>
      <p>{logInMessage}</p>
      <p>
        {name + ' '}
        {mail + ' '}
        {password + ' '}
        {gdprOk ? 'true' : 'false'}
      </p>
      <p>Hämtade användare: {JSON.stringify(user)}</p>
    </form>
  )
}

export default LoginForm
