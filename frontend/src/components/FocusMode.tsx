import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FocusMode: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(25 * 60); // 25 minutes in seconds
  const [focusDuration, setFocusDuration] = useState<number>(25);
  const [breakDuration, setBreakDuration] = useState<number>(5);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  useEffect(() => {
    // Fetch focus mode status when component mounts
    const fetchFocusModeStatus = async () => {
      try {
        const response = await api.get('/focus-mode/status');
        setIsActive(response.data.isActive);
        setRemainingTime(response.data.remainingTime);
        setIsBreak(response.data.isBreak || false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFocusModeStatus();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            // Time's up
            if (isBreak) {
              // Break is over, start a new focus session
              handleBreakComplete();
              return focusDuration * 60;
            } else {
              // Focus session is over, start a break
              handleFocusComplete();
              return breakDuration * 60;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, isBreak, focusDuration, breakDuration]);

  const handleFocusComplete = async () => {
    try {
      setIsBreak(true);
      setCompletedSessions(prev => prev + 1);
      await api.post('/focus-mode/stop');
      // Earn focus credits for completing a session
      await api.post('/rewards/earn', { amount: 10, reason: 'Completed focus session' });
    } catch (err: any) {
      setError('Failed to complete focus session');
      console.error(err);
    }
  };

  const handleBreakComplete = async () => {
    try {
      setIsBreak(false);
      await api.post('/focus-mode/start');
    } catch (err) {
      setError('Failed to start new focus session');
      console.error(err);
    }
  };

  const startFocusMode = async () => {
    try {
      const response = await api.post('/focus-mode/start');
      setIsActive(true);
      setIsPaused(false);
      setIsBreak(false);
      setRemainingTime(focusDuration * 60);
      setError('');
    } catch (err) {
      setError('Failed to start focus mode');
      console.error(err);
    }
  };

  const pauseFocusMode = () => {
    setIsPaused(true);
  };

  const resumeFocusMode = () => {
    setIsPaused(false);
  };

  const stopFocusMode = async () => {
    try {
      await api.post('/focus-mode/stop');
      setIsActive(false);
      setIsPaused(false);
      setRemainingTime(focusDuration * 60);
      setIsBreak(false);
      setError('');
    } catch (err) {
      setError('Failed to stop focus mode');
      console.error(err);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="focus-mode-container">
      <h2>Focus Mode</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="timer-display">
        <div className="timer">
          <h3>{isBreak ? 'Break Time' : 'Focus Time'}</h3>
          <div className="time">{formatTime(remainingTime)}</div>
        </div>

        <div className="session-info">
          <p>Completed Sessions: {completedSessions}</p>
          <p>Current Mode: {isBreak ? 'Break' : 'Focus'}</p>
        </div>
      </div>

      <div className="timer-controls">
        {!isActive ? (
          <div className="setup-controls">
            <div className="form-group">
              <label htmlFor="focusDuration">Focus Duration (minutes):</label>
              <input
                type="number"
                id="focusDuration"
                value={focusDuration}
                onChange={(e) => setFocusDuration(Math.max(1, parseInt(e.target.value) || 25))}
                min="1"
                max="60"
              />
            </div>
            <div className="form-group">
              <label htmlFor="breakDuration">Break Duration (minutes):</label>
              <input
                type="number"
                id="breakDuration"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Math.max(1, parseInt(e.target.value) || 5))}
                min="1"
                max="30"
              />
            </div>
            <button onClick={startFocusMode}>Start Focus Mode</button>
          </div>
        ) : (
          <div className="active-controls">
            {isPaused ? (
              <button onClick={resumeFocusMode}>Resume</button>
            ) : (
              <button onClick={pauseFocusMode}>Pause</button>
            )}
            <button onClick={stopFocusMode}>Stop</button>
          </div>
        )}
      </div>

      <div className="focus-explanation">
        <h3>About Focus Mode</h3>
        <p>
          Focus Mode uses the Pomodoro Technique to help you maintain concentration and productivity.
          Work for a set period (default 25 minutes), then take a short break (default 5 minutes).
          This cycle helps maintain mental freshness and sustained focus.
        </p>
        <p>
          Each completed focus session earns you Focus Credits that can be redeemed for rewards!
        </p>
      </div>
    </div>
  );
};

export default FocusMode;