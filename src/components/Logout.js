import '../styles/logout.css'
import image from '../images/Group 382.svg'
import useLogout from '../hooks/useLogout'

const Logout = () => {
  const logout = useLogout()

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }
  return (
    <div className="logout">
      <div className="logout-section">
        <form className="logout-form">
          <img src={image} alt="logout" />
          <span>
            Clicking the button will log you out of the system, Are you sure you
            want to logout?
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}

export default Logout
