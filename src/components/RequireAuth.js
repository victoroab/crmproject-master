import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const location = useLocation()

  const authToken = window.localStorage.getItem('n0authTok3n')

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
