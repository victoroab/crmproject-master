import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/agentcases.css'
import AddCases from './AddCases'
import { FiSearch } from 'react-icons/fi'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const Cases = () => {
  const { tok } = useAuth()
  const [displayCase, setDisplayCase] = useState(false)

  function closePopUp() {
    setDisplayCase(false)
  }

  function openPopUp() {
    setDisplayCase(true)
  }

  const [mount, setMount] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [allCases, setAllCases] = useState([])
  const [allNumbers, setAllNumbers] = useState([])
  const [realAccounts, setRealAccounts] = useState([])

  const getCases = async () => {
    const response = await axios.get('/api/casemanagement', {
      headers: { Authorization: `Bearer ${tok}` },
    })
    const { accnos, cases, details } = response.data
    const nameAndNumber = details.map((detail) => ({
      fullName: detail['COL 3'],
      accNo: detail['COL 4'],
    }))
    setRealAccounts(nameAndNumber)
    setAllCases(cases)
    setAllNumbers(accnos)
  }

  useEffect(() => {
    getCases()
  }, [mount])

  const caseElement = allCases
    .filter((item) => {
      return searchTerm === ''
        ? item
        : item.id.toLowerCase().includes(searchTerm.toLowerCase())
        ? item
        : ''
    })
    .filter((item) => {
      return item?.status !== 'closed' && item
    })
    .reverse()
    .map((data, index) => {
      const { details } = data
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>
            {realAccounts
              .filter((number) => {
                return number?.accNo === data?.accountNumber && number
              })
              .map((data) => `${data.fullName}`)}
          </td>
          <td>{data.accountNumber}</td>
          <td>{data.agent}</td>
          <td>{details.slice(0, 9)}...</td>
          <td>{data.date}</td>
          <td>{data.status}</td>
          <td>
            <Link to={`/cases/${data.id}`} className="view-case-lnk">
              View
            </Link>
          </td>
          <td>
            <button
              className="close-case-btn"
              onClick={async () => {
                try {
                  await axios.post('/api/updstatus', {
                    id: data.id,
                    status: 'closed',
                  })
                  setMount((prev) => !prev)
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              Close Case
            </button>
          </td>
        </tr>
      )
    })

  return (
    <div className="cases-section">
      <section className="cases-body">
        <div className="cases-body-text">
          <div className="cases-body-text-row1">
            <p>Admin Management Cases</p>
            <p className="pr">Accounts | Admin</p>
          </div>

          <div className="cases-body-text-row2">
            <p>Cases</p>
            <div className="cb-row2-items">
              <div className="search-cases">
                <FiSearch className="search-cases-icon" />
                <input
                  type="text"
                  placeholder="Search Case ID"
                  className="search-cases-input"
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                  }}
                />
              </div>

              <button className="add-case-btn" onClick={openPopUp}>
                Add Case
              </button>
            </div>
          </div>
        </div>

        {displayCase && (
          <AddCases closePopUp={closePopUp} setMount={setMount} />
        )}

        <div className="cases-table-section">
          <div className="cases-table-surround">
            <table className="cases-table">
              <thead>
                <tr>
                  <td className="cases-table-heading-data">Case id</td>
                  <td className="cases-table-heading-data">Customer name</td>
                  <td className="cases-table-heading-data">Account number</td>
                  <td className="cases-table-heading-data">Agent</td>
                  <td className="cases-table-heading-data">Case details</td>
                  <td className="cases-table-heading-data">Date created</td>
                  <td className="cases-table-heading-data">Status</td>
                  <td className="cases-table-heading-data">Action</td>
                </tr>
              </thead>
              <tbody>{caseElement}</tbody>
            </table>
          </div>
          <p className="cases-count">{`${caseElement.length} Case${
            caseElement.length > 1 ? 's' : ''
          }`}</p>
        </div>
      </section>
    </div>
  )
}

export default Cases
