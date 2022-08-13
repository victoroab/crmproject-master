import '../styles/agentcases.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const ViewCase = () => {
  const tok = window.localStorage.getItem('n0authTok3n')
  const navigate = useNavigate()

  const pathname = window.location.pathname
  const caseId = pathname.split('/')[2]

  const stats = ['processing', 'resolved']

  const [allCases, setAllCases] = useState([])
  const [realAccounts, setRealAccounts] = useState([])

  const getData = async () => {
    const response = await axios.get('/api/casemanagement', {
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

  useEffect(() => {
    getData()
  }, [])

  const showCase = allCases.filter((item) => item.id === caseId && item)

  const [newStatus, setNewStatus] = useState('')

  const handleStatusChange = async () => {
    try {
      if (newStatus !== '') {
        await axios.post('/api/updstatus', {
          id: caseId,
          status: newStatus,
        })
        navigate(-1)
      } else {
        console.log('You have to change the status')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="cases-section">
      <section className="cases-body" style={{ overflowX: 'hidden' }}>
        <div className="cases-body-text">
          <button onClick={() => navigate(-1)} className="back-btn">
            Back
          </button>
        </div>
        <div className="cases-table-section">
          <div className="cases-table-surround" style={{ overflowX: 'hidden' }}>
            {showCase.map((item, id) => (
              <div key={id} className="view-cases">
                <span>
                  <span className="case-title-bl">Case Id</span>:{' '}
                  <span>{item.id}</span>
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Customer Name</span>:{' '}
                  {realAccounts
                    .filter(
                      (number) => number.accNo === item.accountNumber && number
                    )
                    .map((data) => `${data.fullName}`)}
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Account Number</span>:{' '}
                  {item.accountNumber}
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Case Category</span>:{' '}
                  {item.category}
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Case Details</span>:{' '}
                  {item.details}
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Date Created</span>:{' '}
                  {item.date}
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Date Closed</span>:{' '}
                  {item?.dateClosed}
                </span>
                <br />
                <span>
                  <span className="case-title-bl">Status</span>:{' '}
                  {item.status === 'closed' ? (
                    item.status
                  ) : (
                    <select
                      onChange={(e) => {
                        setNewStatus(e.target.value)
                      }}
                      value={newStatus}
                    >
                      <option value={item.status} defaultValue>
                        {item.status}
                      </option>
                      <option
                        value={stats
                          .filter((stat) => stat !== item.status && stat)
                          .map((stat) => stat)}
                      >
                        {stats
                          .filter((stat) => stat !== item.status && stat)
                          .map((stat) => stat)}
                      </option>
                    </select>
                  )}
                  {item.status !== 'closed' ? (
                    <button
                      onClick={handleStatusChange}
                      className="chg-status-btn"
                    >
                      Change Status
                    </button>
                  ) : (
                    ' '
                  )}
                </span>

                <br />
                <span>
                  <span className="case-title-bl">Agent In Charge</span>:{' '}
                  {item.agent}
                </span>
                <br />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default ViewCase
