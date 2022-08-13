import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Agents from './components/Agents'
import AddAgent from './components/AddAgent'
import Cases from './components/Cases'
import Layout2 from './components/Layout2'
import ClosedCases from './components/ClosedCases'
import Logout from './components/Logout'
import ViewCase from './components/ViewCase'
import RequireAuth from './components/RequireAuth'
import './app.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout2 />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="agents" element={<Agents />} />
            <Route path="/agents/invite" element={<AddAgent />} />
            <Route path="/cases">
              <Route index element={<Cases />} />
              <Route path=":caseId" element={<ViewCase />} />
            </Route>
            <Route path="clcases" element={<ClosedCases />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>

        {/** */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
