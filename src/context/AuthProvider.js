import { createContext, useState } from 'react'
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const tok = window.localStorage.getItem('n0authTok3n')

  return (
    <AuthContext.Provider value={{ auth, setAuth, tok }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
