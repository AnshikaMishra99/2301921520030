import React, { useState, useEffect } from "react";
import { sendLog } from "./utils/logger";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await sendLog("frontend", "info", "api", "Initiating API fetch payload hook");
        
        let url = `http://4.224.186.213/evaluation-service/notifications?limit=${limit}`;
        if (typeFilter) {
          url += `&notification_type=${typeFilter}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
          await sendLog("frontend", "info", "api", "Successfully loaded fresh rows from remote endpoint");
        }
      } catch (err) {
        await sendLog("frontend", "error", "api", `Failed transaction call: ${err.message}`);
      }
    };

    fetchNotifications();
  }, [typeFilter, limit]);

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
        {notifications.length === 0 ? (
          <p className="no-data">Syncing live server payload records...</p>
        ) : (
          notifications.map((item) => (
            <div key={item.ID} className={`alert-card status-${item.Type?.toLowerCase()}`}>
              <div className="badge">{item.Type}</div>
              <div className="content">
                <p className="msg">{item.Message}</p>
                <span className="timestamp">{new Date(item.Timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;