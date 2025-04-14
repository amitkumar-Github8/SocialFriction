import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TimeBudget: React.FC = () => {
  const [budget, setBudget] = useState<number>(0);
  const [newBudget, setNewBudget] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    // Fetch current time budget when component mounts
    const fetchTimeBudget = async () => {
      try {
        const response = await api.get('/time-budget/get-budget');
        setBudget(response.data.budget);
        setNewBudget(response.data.budget);
        setTimeSpent(response.data.timeSpent || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTimeBudget();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newBudget < 0) {
      setError('Budget cannot be negative');
      return;
    }

    try {
      await api.post('/time-budget/set-budget', { budget: newBudget });
      setBudget(newBudget);
      setSuccess('Time budget updated successfully');
      setError('');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('Failed to update time budget');
      console.error(err);
    }
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculateRemainingTime = (): number => {
    return Math.max(0, budget - timeSpent);
  };

  const getRemainingTimePercentage = (): number => {
    if (budget === 0) return 0;
    return Math.min(100, Math.max(0, (calculateRemainingTime() / budget) * 100));
  };

  return (
    <div className="time-budget-container">
      <h2>Time Budget</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="budget-info">
        <div className="budget-stats">
          <div className="stat">
            <h3>Current Budget</h3>
            <p>{formatTime(budget)}</p>
          </div>
          <div className="stat">
            <h3>Time Spent</h3>
            <p>{formatTime(timeSpent)}</p>
          </div>
          <div className="stat">
            <h3>Remaining</h3>
            <p>{formatTime(calculateRemainingTime())}</p>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${getRemainingTimePercentage()}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="budget-form">
        <h3>Set New Budget</h3>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            min="0"
            value={Math.floor(newBudget / 60)}
            onChange={(e) => {
              const hours = parseInt(e.target.value) || 0;
              const minutes = newBudget % 60;
              setNewBudget(hours * 60 + minutes);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="minutes">Minutes:</label>
          <input
            type="number"
            id="minutes"
            min="0"
            max="59"
            value={newBudget % 60}
            onChange={(e) => {
              const minutes = parseInt(e.target.value) || 0;
              const hours = Math.floor(newBudget / 60);
              setNewBudget(hours * 60 + minutes);
            }}
          />
        </div>
        <button type="submit">Update Budget</button>
      </form>

      <div className="budget-explanation">
        <h3>About Time Budgeting</h3>
        <p>
          Setting a time budget helps you manage how much time you spend on certain activities.
          By being mindful of your time allocation, you can ensure a healthy balance between
          online activities and other aspects of your life.
        </p>
      </div>
    </div>
  );
};

export default TimeBudget;