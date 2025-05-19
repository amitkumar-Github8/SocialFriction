'use client';

import { useState, useEffect } from 'react';

interface StreakData {
  platform: string;
  currentStreak: number;
  longestStreak: number;
}

const StreakTracker = () => {
  const [streakData, setStreakData] = useState<StreakData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/streaks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch streak data');
        }

        const data = await response.json();
        setStreakData(data.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching streak data');
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (streakData.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-gray-700 rounded-md">
        No streak data available yet. Start meeting your goals to build streaks!
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Goal Streaks</h3>
      <div className="space-y-4">
        {streakData.map((streak) => (
          <div key={streak.platform} className="border-b pb-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700">{streak.platform}</h4>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Current Streak</p>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-indigo-600">{streak.currentStreak}</div>
                  <div className="ml-2 text-gray-500">days</div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Longest Streak</p>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-green-600">{streak.longestStreak}</div>
                  <div className="ml-2 text-gray-500">days</div>
                </div>
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ 
                  width: `${streak.longestStreak > 0 
                    ? Math.min((streak.currentStreak / streak.longestStreak) * 100, 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakTracker;
