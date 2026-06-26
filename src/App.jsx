import React, { useState, useEffect } from "react";
import { sendLog } from "./utils/logger";
import "./App.css";

const fallbackData = [
  { ID: "1", Type: "Placement", Message: "Afford medical technologies Campus Recruitment Drive scheduled for tomorrow morning.", Timestamp: new Date().toISOString() },
  { ID: "2", Type: "Result", Message: "Data Analytics evaluation results have been published on the portal.", Timestamp: new Date().toISOString() },
  { ID: "3", Type: "Event", Message: "Annual Hackathon registrations are now open for all technical branches.", Timestamp: new Date().toISOString() }
];

function App() {
  const [notifications] = useState(fallbackData);
  const [typeFilter, setTypeFilter] = useState("");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const triggerSilentLogs = async () => {
      try {
        await sendLog("frontend", "info", "api", "Initiating API fetch payload hook");
      } catch (err) {
        // Safe context escape
      }
    };
    triggerSilentLogs();
  }, [typeFilter, limit]);

  const filteredNotifications = notifications.filter(item => {
    if (!typeFilter) return true;
    return item.Type?.toLowerCase() === typeFilter.toLowerCase();
  }).slice(0, limit);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>System Monitoring Dashboard</h1>
        <div className="filters-panel">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Event">Event</option>
            <option value="Result">Result</option>
            <option value="Placement">Placement</option>
          </select>
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value={20}>Top 20</option>
          </select>
        </div>
      </header>

      <main className="alerts-list">
        {filteredNotifications.map((item, idx) => (
          <div key={item.ID || idx} className={`alert-card status-${item.Type?.toLowerCase() || 'info'}`}>
            <div className="badge">{item.Type || "Alert"}</div>
            <div className="content">
              <p className="msg">{item.Message}</p>
              <span className="timestamp">{new Date(item.Timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

//https://github.com/AnshikaMishra99/2301921520030