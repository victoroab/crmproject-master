import React from 'react'
import '../styles/accountsettings.css'
import pic from '../images/profilepic.svg'

const AccountSettings = () => {
  return (
    <div className="accountSettings">
      <section className="settings">
        <div className="settings-text">
          <div className="settings-text-row1">
            <p>Admin Management System Overview</p>
            <p className="pr">Accounts | Awacash</p>
          </div>

          <div className="settings-text-row2">
            <p>Dashboard</p>
          </div>
        </div>

        <div className="settings-body">
          <span className="settings-body-row1">Profile</span>
          <div>
            <img src={pic} alt="" className="profile-pic" />
          </div>
          <p>*This profile picture can only be edited by the user</p>
          <form className="settings-form">
            <p className="form-text">Password</p>
            <input type="password" className="settings-form-password" />
            <p>Confirm Password</p>
            <input type="password" className="settings-form-password" />
            <button className="settings-form-submit">Submit</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AccountSettings
