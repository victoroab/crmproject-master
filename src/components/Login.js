import logo from '../images/awacash logo 3.png'
import '../styles/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        '/api/login',
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      const { authToken, username } = response?.data
      window.localStorage.setItem('n0authTok3n', authToken)
      window.localStorage.setItem('belongsToUsername', username)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login">
      <header>
        <img src={logo} alt="logo" className="awcsh-logo" />
      </header>
      <main>
        <p>Admin Login</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            className="form-email"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn">Login</button>
        </form>
      </main>
    </div>
  )
}

export default Login
