import React from 'react';
import './Dashboard.css';

const Heatmap = ({ activityLog }) => {
    const today = new Date();
    const days = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const count = activityLog[dateString] || 0;
        
        let colorClass = 'day-level-0';
        if (count > 0 && count <= 2) colorClass = 'day-level-1';
        else if (count > 2 && count <= 5) colorClass = 'day-level-2';
        else if (count > 5 && count <= 8) colorClass = 'day-level-3';
        else if (count > 8) colorClass = 'day-level-4';
        
        return <div key={i} className={`heatmap-day ${colorClass}`} title={`${count} contributions on ${dateString}`}></div>;
    });

    return <div className="heatmap-grid">{days.reverse()}</div>;
};

const Dashboard = ({ interviews, stats, activityLog, history }) => {
  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Total Questions</h3>
          <p>{stats.total}</p>
        </div>
        <div className="card stat-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="card stat-card">
          <h3>To Review</h3>
          <p>{stats.toReview}</p>
        </div>
        <div className="card stat-card">
          <h3>Mastery Score</h3>
          <p>{stats.masteryScore}%</p>
        </div>
      </div>
      
      <div className="dashboard-main-grid">
          <div className="dashboard-left">
              <div className="card">
                <h3>Solved Questions History</h3>
                {history.length > 0 ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td><span className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span></td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-history-text">Your history will appear here once you mark questions as "done" or "review".</p>
                )}
              </div>
              <div className="card">
                  <h3>Contribution Heatmap</h3>
                  <Heatmap activityLog={activityLog} />
              </div>
          </div>
          <div className="dashboard-right">
              <div className="card">
                  <h3>Your Progress</h3>
                  <div className="progress-chart">
                      <div className="doughnut" style={{'--p': stats.masteryScore, '--c': '#48bb78'}}>{stats.masteryScore}%</div>
                  </div>
                   <div className="legend">
                        <div><span className="legend-color completed"></span> Completed</div>
                        <div><span className="legend-color in-progress"></span> In Progress</div>
                        <div><span className="legend-color not-started"></span> Not Started</div>
                    </div>
              </div>
              <div className="card">
                  <h3>Upcoming Interviews</h3>
                  <ul className="interviews-list">
                      {interviews.map(interview => (
                          <li key={interview.id}>
                              <strong>{interview.role}</strong>
                              <p>{interview.company} - {interview.date}</p>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;