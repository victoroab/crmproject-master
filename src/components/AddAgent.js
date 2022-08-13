import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { v4 as uuid } from 'uuid'
import '../styles/addagent.css'

const AddAgent = () => {
  const navigate = useNavigate()

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [agentId, setAgentId] = useState('ag-' + uuid().slice(0, 3))

  const handleRegister = async (e) => {
    e.preventDefault()
    await axios.post(
      '/api/register',
      JSON.stringify({
        firstname,
        lastname,
        email,
        username: agentId,
        password,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
    navigate(-1)
  }

  return (
    <div className="add-agent-container">
      <section className="add-agent-body">
        <div className="add-agent-body-text">
          <div className="add-agent-body-text-row2">
            <p>Register An Agent</p>
          </div>
          <button onClick={() => navigate(-1)} className="back-btn">
            Back
          </button>
        </div>

        <div className="add-agent-table-section">
          <form className="" onSubmit={handleRegister}>
            <label className="" htmlFor="firstname">
              Firstname
            </label>
            <input
              type=""
              className=""
              id="firstname"
              value={firstname}
              required
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <br />
            <label className="" htmlFor="lastname">
              Lastname
            </label>
            <input
              type=""
              className=""
              id="lastname"
              value={lastname}
              required
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
            <br />
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              type=""
              className=""
              id="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <br />
            <label htmlFor="agentId">Agent Id</label>
            <input type="" className="" id="agentId" value={agentId} readOnly />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type=""
              className=""
              id="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <br />
            <button className="">Register</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AddAgent
