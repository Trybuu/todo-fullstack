import { useState } from 'react'
import { useCookies } from 'react-cookie'

function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  console.log(cookies)

  function viewLogin(status) {
    setError(null)
    setIsLogin(status)
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault()

    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!')
      return
    }

    const res = await fetch(
      `https://todoapp-server-xwnw.onrender.com/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    )

    const data = await res.json()
    if (data.detail) {
      console.log(data)
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
  }

  return (
    <div>
      <div>
        <form>
          <h2>{isLogIn ? 'Please log in' : 'Please sign up!'}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
          />
          {error && <p>{error}</p>}
        </form>

        <div>
          <button onClick={() => viewLogin(false)}>Sign up</button>
          <button onClick={() => viewLogin(true)}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
