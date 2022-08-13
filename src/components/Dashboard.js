import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import img1 from '../images/Group 277.png'
import axios from '../api/axios'

const Dashboard = () => {
  const tok = window.localStorage.getItem('n0authTok3n')
  const agent = window.localStorage.getItem('belongsToUsername')

  const navigate = useNavigate()
  const [agents, setAgents] = useState([])
  const [allCases, setAllCases] = useState([])
  const [realAccounts, setRealAccounts] = useState([])

  const agentsPage = () => {
    navigate('/agents')
  }

  const casesPage = () => {
    navigate('/cases')
  }

  const getDash = async () => {
    const response = await axios.get('/api/dashboard', {
      headers: { Authorization: `Bearer ${tok}` },
    })
    const { cases, details } = response.data
    const nameAndNumber = details.map((detail) => ({
      fullName: detail['COL 3'],
      accNo: detail['COL 4'],
    }))
    setRealAccounts(nameAndNumber)
    setAllCases(cases)
  }

  const GetAgents = async () => {
    const response = await axios.get('/api/agents', {
      headers: { Authorization: `Bearer ${tok}` },
    })
    const { agentsId } = response.data
    setAgents(agentsId)
  }

  useEffect(() => {
    getDash()
    GetAgents()
  }, [])

  const displayAgents = agents
    .filter((item) => item.name !== 'admin')
    .map((data, index) => {
      return (
        <div className="agents-body-items" key={index}>
          <div className="items">
            <div>{data.name}</div>
            <p>{data.email}</p>
          </div>
        </div>
      )
    })

  const displayCases = allCases
    .filter((c) => true)
    .filter((item) =>
      agent === 'admin' ? item : agent !== 'admin' ? item.agent === agent : ''
    )
    .reverse()
    .map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>
            {realAccounts
              .filter((number) => number.accNo === data.accountNumber && number)
              .map((data) => `${data.fullName}`)}
          </td>
          <td>{data.accountNumber}</td>
          <td>{data.agent}</td>
          <td>{data.details}</td>
          <td>{data.date}</td>
          <td>{data.status}</td>
        </tr>
      )
    })

  return (
    <div className="dashboard-section">
      <section className="dashboard-body">
        <div className="dashboard-text">
          <div className="dashboard-text-row1">
            <p>Dashboard</p>
          </div>

          <div className="dashboard-text-row2">{/* <p>Dashboard</p> */}</div>
        </div>

        <div className="dashboard-cases">
          <div className="dashboard-cases-c">
            <img src={img1} alt="cases" />
            <p className="dashboard-c-text">Total Number of Cases</p>
            <p className="dashboard-c-number">
              {allCases.filter((item) => item.agent === agent).length}
            </p>
          </div>
          <div className="dashboard-cases-c">
            <img src={img1} alt="cases" />
            <p className="dashboard-c-text">Total Number of Closed Cases</p>
            <p className="dashboard-c-number">
              {
                allCases
                  .filter((item) => item.status === 'closed' && item)
                  .filter((item) => item.agent === agent).length
              }
            </p>
          </div>
          <div className="dashboard-cases-c">
            <img src={img1} alt="cases" />
            <p className="dashboard-c-text">Total Number of Resolved Cases</p>
            <p className="dashboard-c-number">
              {' '}
              {
                allCases
                  .filter((item) => item.status === 'resolved' && item)
                  .filter((item) => item.agent === agent).length
              }
            </p>
          </div>
        </div>

        <div className="dashboard-agents">
          <p className="agents-row1">Agents</p>

          <div className="agents-body">
            <div className="agents-body-heading">
              <p>Agent Id</p>
              <p>Email</p>
            </div>

            {displayAgents.slice(0, 3)}
          </div>
          <button className="cases-btn" onClick={agentsPage}>
            View More
          </button>
        </div>

        <div className="d-agents">
          <p className="agents-row1">Cases</p>
          <div className="agent-table-overflow">
            <table className="agents-table">
              <thead>
                <tr>
                  <td className="heading-data">Case id</td>
                  <td className="heading-data">Customer Name</td>
                  <td className="heading-data">Account Number</td>
                  <td className="heading-data">Agent</td>
                  <td className="heading-data">Case details</td>
                  <td className="heading-data">Date created</td>
                  <td className="heading-data">Status</td>
                </tr>
              </thead>
              <tbody>{displayCases.slice(0, 3)}</tbody>
            </table>
          </div>

          <button className="cases-btn" onClick={casesPage}>
            View More
          </button>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
