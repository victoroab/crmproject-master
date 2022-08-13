import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/closedcases.css'
import { FiSearch } from 'react-icons/fi'
import axios from '../api/axios'

const ClosedCases = () => {
  const tok = window.localStorage.getItem('n0authTok3n')
  const agent = window.localStorage.getItem('belongsToUsername')
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

  const [searchItem, setSearchItem] = useState('')
  const closedCaseElements = allCases
    .filter((item) => {
      return searchItem === ''
        ? item
        : item.id.toLowerCase().includes(searchItem.toLowerCase())
        ? item
        : ''
    })
    .filter((item) => {
      return item?.status === 'closed' && item
    })
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
              .filter((number) => {
                return number?.accNo === data?.accountNumber && number
              })
              .map((data) => `${data.fullName}`)}
          </td>
          <td>{data.accountNumber}</td>
          <td>{data.agent}</td>
          <td>{data.details.slice(0, 9)}</td>
          <td>{data.date}</td>
          <td>{data.dateClosed}</td>
          <td>{data.status}</td>
          <td>
            <Link to={`/cases/${data.id}`} className="view-case-lnk">
              View
            </Link>
          </td>
        </tr>
      )
    })

  return (
    <div className="closed-cases">
      <section className="case-body">
        <div className="case-body-text">
          <div className="case-body-text-row1">
            <p>Closed Cases</p>
          </div>

          <div className="case-body-text-row2">
            {/* <p>Closed Cases</p> */}
            <div className="ccb-row2-items">
              <div className="search-closed-cases">
                <FiSearch className="search-closed-cases-icon" />
                <input
                  type="text"
                  placeholder="Search Case ID"
                  className="search-closed-cases-input"
                  onChange={(event) => {
                    setSearchItem(event.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="cases-table-section">
          <div className="case-table-surround">
            <table className="cases-table">
              <thead>
                <tr>
                  <td className="cases-table-heading-data">Case id</td>
                  <td className="cases-table-heading-data">Customer name</td>
                  <td className="cases-table-heading-data">Account number</td>
                  <td className="cases-table-heading-data">Agent</td>
                  <td className="cases-table-heading-data">Case details</td>
                  <td className="cases-table-heading-data">Date Created</td>
                  <td className="cases-table-heading-data">Date Closed</td>
                  <td className="cases-table-heading-data">Status</td>
                </tr>
              </thead>
              <tbody>{closedCaseElements}</tbody>
            </table>
          </div>
          <p className="cases-count">{`${closedCaseElements.length} Case${
            closedCaseElements.length > 1 ? 's' : ''
          }`}</p>
        </div>
      </section>
    </div>
  )
}

export default ClosedCases
