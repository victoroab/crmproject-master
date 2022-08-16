import '../styles/agentcases.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import jsPDF from 'jspdf'

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
      fullName: detail.fullName,
      accNo: detail.accountNumber,
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

  const generatePdf = () => {
    let doc = jsPDF('landscape', 'px', 'a4', 'false')
    doc.text(40, 60, `Case Id: ${caseId}`)
    doc.text(
      40,
      90,
      `Customer Name: ${showCase.map(
        (c) =>
          `${realAccounts
            .filter((number) => number.accNo === c.accountNumber && number)
            .map((data) => `${data.fullName}`)}`
      )}`
    )
    doc.text(
      40,
      120,
      `Account Number: ${showCase.map((c) => `${c.accountNumber}`)}`
    )
    doc.text(40, 150, `Case Category: ${showCase.map((c) => `${c.category}`)}`)
    doc.text(40, 180, `Case Details: ${showCase.map((c) => `${c.details}`)}`)
    doc.text(40, 210, `Date Created: ${showCase.map((c) => `${c.date}`)}`)
    doc.text(40, 240, `Date Closed: ${showCase.map((c) => `${c.dateClosed}`)}`)
    doc.text(40, 270, `Status: ${showCase.map((c) => `${c.status}`)}`)
    doc.text(40, 300, `Agent in Charge: ${showCase.map((c) => `${c.agent}`)}`)
    doc.save('case.pdf')
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
                <button onClick={generatePdf} className="chg-status-btn">
                  Export as pdf
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default ViewCase
