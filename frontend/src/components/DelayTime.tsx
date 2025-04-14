import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DelayTime: React.FC = () => {
  const [delayTime, setDelayTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch current delay time when component mounts
    const fetchDelayTime = async () => {
      try {
        const response = await api.get('/delay/get-progressive-delay');
        setDelayTime(response.data.delayTime);
      } catch (err) {
        setError('Failed to fetch delay time');
        console.error(err);
      }
    };

    fetchDelayTime();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && remainingTime === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const startDelay = async () => {
    try {
      const response = await api.post('/delay/set-progressive-delay');
      setDelayTime(response.data.delayTime);
      setRemainingTime(response.data.delayTime * 60); // Convert minutes to seconds
      setIsActive(true);
    } catch (err) {
      setError('Failed to start delay');
      console.error(err);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="delay-time-container">
      <h2>Progressive Delay</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="delay-info">
        <p>Current delay time: {delayTime} minutes</p>
        {isActive ? (
          <div className="timer">
            <p>Time remaining: {formatTime(remainingTime)}</p>
            <p>Please wait before accessing the site...</p>
          </div>
        ) : (
          <button onClick={startDelay}>Start Delay</button>
        )}
      </div>

      <div className="delay-explanation">
        <h3>What is Progressive Delay?</h3>
        <p>
          Progressive Delay is a feature that helps you be more mindful of your online activities.
          Each time you access a distracting site, the delay time increases slightly, encouraging
          you to think twice before engaging with potentially distracting content.
        </p>
      </div>
    </div>
  );
};

export default DelayTime;