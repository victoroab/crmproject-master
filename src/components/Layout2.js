import React, { useState } from 'react'
import '../styles/layout2.css'
import NewSideMenu from './NewSideMenu'
import Header2 from './Header2'
import { Outlet } from 'react-router-dom'

const Layout2 = () => {
  const [sideBar, setSideBar] = useState(false)
  const [pathName, setPathName] = useState(window.location.pathname)

  function handleClick() {
    setSideBar((prevSideBar) => !prevSideBar)
    setPathName(window.location.pathname)
  }

  return (
    <div className="layout2">
      <Header2 displaySideBar={handleClick} />
      <NewSideMenu
        sideBar={sideBar}
        closeSideBar={handleClick}
        pathName={pathName}
        setPathName={setPathName}
      />
      <Outlet />
    </div>
  )
}

export default Layout2
