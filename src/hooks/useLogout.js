import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    window.localStorage.removeItem('n0authTok3n')
    window.localStorage.removeItem('belongsToUsername')
    navigate('/login')
  }

  return logout
}

export default useLogout
