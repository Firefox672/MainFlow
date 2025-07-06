"use client"

import { useAuth } from "../context/AuthContext"
import "./Dashboard.css"

const Dashboard = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome back, {user?.name || "User"}!</h2>
          <p>You have successfully logged in to your account.</p>
          <div className="user-info">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>User ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Login Time:</strong> {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Logins</h3>
            <p className="stat-number">42</p>
          </div>
          <div className="stat-card">
            <h3>Last Login</h3>
            <p className="stat-number">Today</p>
          </div>
          <div className="stat-card">
            <h3>Account Status</h3>
            <p className="stat-number">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
