import React, { useState, useEffect } from "react";
import { sendLog } from "./utils/logger";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    sendLog("frontend", "info", "page", "User accessed dashboard home interface");

    
    const systemAlerts = [
      { id: "id-101", severity: "info", text: "Database cluster sync completed without delays." },
      { id: "id-102", severity: "warn", text: "Memory threshold exceeding 80% on primary node." },
      { id: "id-103", severity: "error", text: "Webhook payload verification handshake failed." }
    ];

    setAlerts(systemAlerts);
    setLoading(false);
    sendLog("frontend", "info", "api", "Initial diagnostic list successfully fetched");
  }, []);

  const handleRemoveAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    sendLog("frontend", "debug", "component", `Card instance context ${id} closed by interaction`);
  };

  if (loading) {
    return <div className="loading-state">Syncing dashboard instances...</div>;
  }

  return (
    <div className="main-wrapper">
      <header className="app-bar">
        <h2>System Monitoring Dashboard</h2>
        <span className="live-tag">Live Feed</span>
      </header>

      <div className="content-area">
        {alerts.length === 0 ? (
          <div className="no-data">Clear state: No critical metrics to view.</div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`alert-block ${alert.severity}`}>
              <div className="meta-info">
                <span className="status-pill">{alert.severity.toUpperCase()}</span>
                <p className="desc">{alert.text}</p>
              </div>
              <button className="clear-trigger" onClick={() => handleRemoveAlert(alert.id)}>
                Dismiss
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;