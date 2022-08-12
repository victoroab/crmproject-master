import '../styles/newsidemenu.css'
import menuItems from '../data/sideMenuData'
import { Link } from 'react-router-dom'

const NewSideMenu = (props) => {
  const menuElements = menuItems.map((item, index) => {
    return (
      <Link
        to={item.path}
        key={index}
        className={`${item.className} `}
        onClick={props.sideBar && props.closeSideBar}
      >
        {item.icon}
        <li key={index}>
          <span className="itemtitle">{item.title}</span>
        </li>
      </Link>
    )
  })

  return (
    <>
      <div className="newSideMenu">
        <nav className={props.sideBar ? 'active' : 'none'}>
          <ul className="menu-items">{menuElements}</ul>
        </nav>
      </div>
    </>
  )
}

export default NewSideMenu
