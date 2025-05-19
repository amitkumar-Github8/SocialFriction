'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface UsageData {
  date: string;
  timeSpent: number;
  platform: string;
}

interface UsageChartProps {
  platform?: string;
  startDate?: string;
  endDate?: string;
}

const UsageChart = ({ platform, startDate, endDate }: UsageChartProps) => {
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        // Build query parameters
        let queryParams = new URLSearchParams();
        if (platform) queryParams.append('platform', platform);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const response = await fetch(`http://localhost:5000/api/usage?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch usage data');
        }

        const data = await response.json();
        
        // Process data for chart
        const processedData = data.data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          timeSpent: item.timeSpent,
          platform: item.platform,
        }));

        setUsageData(processedData);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching usage data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [platform, startDate, endDate]);

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

  if (usageData.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-gray-700 rounded-md">
        No usage data available for the selected criteria.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Daily Social Media Usage</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={usageData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value: number) => [`${value} minutes`, 'Time Spent']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="timeSpent"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Time Spent (minutes)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
