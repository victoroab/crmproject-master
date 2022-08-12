import React from 'react'
import logo from "../images/awacash logo 3.png"
import "../styles/header2.css"
import { GiHamburgerMenu } from "react-icons/gi";

const Header2 = (props) => {
  return (
    <div className='header2'>
        <header>
            <img src={logo} alt="logo" className="awcsh-logo"/>
            <GiHamburgerMenu 
              className='hmb'
              onClick={props.displaySideBar}
            />
        </header>
    </div>
  )
}

export default Header2

