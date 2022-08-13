import '../styles/addcases.css'
import { useState } from 'react'
import axios from '../api/axios'
import { v4 as uuid } from 'uuid'

const AddCases = (props) => {
  const { closePopUp, setMount } = props

  const [id, setId] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [details, setDetails] = useState('')
  const status = 'processing'

  const agent = window.localStorage.getItem('belongsToUsername')
  const [caseId, setCaseId] = useState('awc-' + uuid().slice(0, 4))

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/api/addcase', {
        id: caseId,
        accountNumber,
        category,
        date,
        details,
        status,
        agent: agent ? agent : ' ',
      })
      setId('')
      setAccountNumber('')
      setCategory('')
      setDate('')
      setDetails('')
      setMount((prev) => !prev)
      closePopUp()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="add-cases-container">
      <div className="close-container" onClick={closePopUp}></div>

      <div className="add-cases-section">
        <form className="cases-form" onSubmit={handleSubmit}>
          <button className="back-btn" onClick={closePopUp}>
            close
          </button>
          <h1 className="cases-form-title">Add Case</h1>

          <label htmlFor="acc-no" className="cases-form-text">
            Account Number
          </label>
          <input
            type="text"
            id="acc-no"
            className="cases-form-input"
            value={accountNumber}
            required
            pattern="[0-9]+"
            maxLength={10}
            onChange={(e) => {
              setAccountNumber(e.target.value)
            }}
          />

          <label htmlFor="caseId" className="cases-form-text">
            Case ID
          </label>
          <input
            type="text"
            className="cases-form-input"
            id="caseId"
            value={caseId}
            required
            readOnly
          />

          <label htmlFor="category" className="cases-form-text">
            Category
          </label>
          <select
            className="cases-form-input"
            id="category"
            value={category}
            required
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          >
            <option value=""></option>
            <option value="Card Issues">Card Issues</option>
            <option value="Failed Transactions">Failed Transactions</option>
            <option value="Login Issues">Login Issues</option>
            <option value="Loans">Loans</option>
          </select>

          <label htmlFor="date" className="cases-form-text">
            Date Created
          </label>
          <input
            type="date"
            className="cases-form-input"
            id="date"
            value={date}
            required
            onChange={(e) => {
              setDate(e.target.value)
            }}
          />

          <label htmlFor="agentInCharge" className="cases-form-text">
            Agent In Charge
          </label>
          <input
            type="text"
            className="cases-form-input"
            id="agentInCharge"
            value={agent ? agent : ''}
            readOnly
          />

          <label htmlFor="details" className="cases-form-text">
            Case Details
          </label>
          <textarea
            className="cases-form-input cases-form-txtarea"
            id="details"
            value={details}
            required
            onChange={(e) => {
              setDetails(e.target.value)
            }}
          ></textarea>
          <button className="cases-form-button">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddCases
