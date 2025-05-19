'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface GoalData {
  platform: string;
  targetTimePerDay: number;
  actualTimeSpent: number;
  percentageUsed: number;
}

const GoalProgress = () => {
  const [goalData, setGoalData] = useState<GoalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        // Fetch active goals
        const goalsResponse = await fetch('http://localhost:5000/api/goals?isActive=true', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!goalsResponse.ok) {
          throw new Error('Failed to fetch goals data');
        }

        const goalsData = await goalsResponse.json();
        
        // Get today's date in ISO format
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch today's usage
        const usageResponse = await fetch(`http://localhost:5000/api/usage?startDate=${today}&endDate=${today}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!usageResponse.ok) {
          throw new Error('Failed to fetch usage data');
        }

        const usageData = await usageResponse.json();
        
        // Process data for chart
        const processedData = goalsData.data.map((goal: any) => {
          // Find matching usage for this platform
          const platformUsage = usageData.data.find((usage: any) => 
            usage.platform === goal.platform
          );
          
          const actualTimeSpent = platformUsage ? platformUsage.timeSpent : 0;
          const percentageUsed = Math.min(
            Math.round((actualTimeSpent / goal.targetTimePerDay) * 100),
            100
          );
          
          return {
            platform: goal.platform,
            targetTimePerDay: goal.targetTimePerDay,
            actualTimeSpent,
            percentageUsed,
          };
        });

        setGoalData(processedData);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching goal data');
      } finally {
        setLoading(false);
      }
    };

    fetchGoalData();
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

  if (goalData.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-gray-700 rounded-md">
        No active goals available. Set some goals to track your progress!
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Goal Progress</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={goalData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="platform" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'targetTimePerDay') return [`${value} minutes`, 'Target Time'];
                return [`${value} minutes`, 'Actual Time'];
              }}
            />
            <Legend />
            <Bar dataKey="targetTimePerDay" fill="#8884d8" name="Target Time" />
            <Bar dataKey="actualTimeSpent" fill="#82ca9d" name="Actual Time">
              {goalData.map((entry, index) => {
                // Color the bar red if over target, green if under
                const color = entry.actualTimeSpent > entry.targetTimePerDay ? '#ff8042' : '#82ca9d';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GoalProgress;
