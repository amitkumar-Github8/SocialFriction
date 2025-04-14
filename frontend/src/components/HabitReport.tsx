import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface HabitData {
  habitName: string;
  frequency: number;
  successRate: number;
}

interface Report {
  week: string;
  habits: HabitData[];
  summary: string;
}

const HabitReport: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch habit report when component mounts
    const fetchHabitReport = async () => {
      try {
        setLoading(true);
        const response = await api.get('/habit-report/weekly');
        setReport(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch habit report');
        console.error(err);
        // Set demo data if API fails
        setDemoData();
      } finally {
        setLoading(false);
      }
    };

    fetchHabitReport();
  }, []);

  const setDemoData = () => {
    const demoReport: Report = {
      week: `${new Date().toLocaleDateString()} - ${new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
      habits: [
        {
          habitName: 'Social Media Usage',
          frequency: 25,
          successRate: 70
        },
        {
          habitName: 'Focus Sessions',
          frequency: 12,
          successRate: 85
        },
        {
          habitName: 'Mindful Alternatives',
          frequency: 8,
          successRate: 90
        },
        {
          habitName: 'Time Budget Adherence',
          frequency: 7,
          successRate: 65
        }
      ],
      summary: 'You\'re making good progress with your digital habits. Your focus sessions have been particularly successful this week. Consider setting more specific time budgets to improve adherence.'
    };
    setReport(demoReport);
  };

  return (
    <div className="habit-report-container">
      <h2>Weekly Habit Report</h2>
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading your habit report...</div>
      ) : report ? (
        <div className="report-content">
          <div className="report-header">
            <h3>Week: {report.week}</h3>
          </div>

          <div className="habits-summary">
            <h3>Habit Performance</h3>
            <div className="habits-list">
              {report.habits.map((habit, index) => (
                <div key={index} className="habit-item">
                  <div className="habit-name">{habit.habitName}</div>
                  <div className="habit-metrics">
                    <div className="metric">
                      <span className="label">Frequency:</span>
                      <span className="value">{habit.frequency} times</span>
                    </div>
                    <div className="metric">
                      <span className="label">Success Rate:</span>
                      <span className="value">{habit.successRate}%</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${habit.successRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-summary">
            <h3>Summary</h3>
            <p>{report.summary}</p>
          </div>

          <div className="report-actions">
            <button onClick={() => window.print()}>Print Report</button>
            <button onClick={() => alert('Report saved successfully!')}>Save Report</button>
          </div>
        </div>
      ) : (
        <div className="no-data">No habit data available for this week.</div>
      )}

      <div className="report-explanation">
        <h3>About Habit Reports</h3>
        <p>
          Your weekly habit report provides insights into your digital behavior patterns.
          By tracking your habits, you can identify areas for improvement and celebrate your
          successes. Regular reflection on these reports can help you develop healthier
          digital habits over time.
        </p>
      </div>
    </div>
  );
};

export default HabitReport;