// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/addagent.css'

const AddAgent = () => {
  const navigate = useNavigate()
  return (
    <div className="add-agent-container">
      <section className="add-agent-body">
        <div className="add-agent-body-text">
          <div className="add-agent-body-text-row1">
            <p>Admin Management Invite Agent</p>
            <p className="pr">Accounts | Admin</p>
          </div>

          <div className="add-agent-body-text-row2">
            <p>Register An Agent</p>
          </div>
          <button onClick={() => navigate(-1)} className="back-btn">
            Back
          </button>
        </div>

        <div className="add-agent-table-section">
          {/* <p>Register An Agent</p> */}
          <form className="">
            <p className="">username</p>
            <input type="" className="" />
            <p>Password</p>
            <input type="" className="" />
            <button className="">Submit</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AddAgent
