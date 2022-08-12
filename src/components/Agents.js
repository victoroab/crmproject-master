import { useState, useEffect } from 'react'
import '../styles/agents.css'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const Agents = () => {
  const { tok } = useAuth()
  const [searchItem, setSearchItem] = useState('')
  const [agents, setAgents] = useState([])

  const getData = async () => {
    const response = await axios.get('/api/dashboard', {
      headers: { Authorization: `Bearer ${tok}` },
    })
    const { agents } = response.data
    setAgents(agents)
  }

  useEffect(() => {
    getData()
  }, [])

  const agentElement = agents
    .filter((item) => {
      if (searchItem === '') {
        return item
      } else if (
        item.username.toLowerCase().includes(searchItem.toLowerCase())
      ) {
        return item
      }
    })
    .filter((item) => item.username !== 'admin')
    .map((data, index) => {
      return (
        <tr key={index}>
          <td>{`${data.firstname} ${data.lastname}`}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>
        </tr>
      )
    })

  return (
    <div className="agent-section">
      <section className="agent-body">
        <div className="agent-body-text">
          <div className="agent-body-text-row1">
            <p>Admin Management Agents</p>
            <p className="pr">Accounts | Admin</p>
          </div>

          <div className="agent-body-text-row2">
            <p>Agents</p>
            <div className="ab-row2-items">
              <div className="search-agents">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Agent ID"
                  className="search-input"
                  onChange={(event) => {
                    setSearchItem(event.target.value)
                  }}
                />
              </div>
              <Link to="invite" className="invite-agent-btn">
                Add Agent
              </Link>
            </div>
          </div>
        </div>

        <div className="agents-table-section">
          <div className="agents-table-surround">
            <table className="agents-table">
              <thead>
                <tr>
                  <td className="agents-table-heading-data">Agent Name</td>
                  <td className="agents-table-heading-data">Id</td>
                  <td className="agents-table-heading-data">Email</td>
                </tr>
              </thead>
              <tbody>{agentElement}</tbody>
            </table>
            <p className="agent-count">{`${agentElement.length} Agent${
              agentElement.length > 1 ? 's' : ''
            }`}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Agents
