'use client';

import { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

interface MoodData {
  mood: string;
  count: number;
  percentage: number;
}

interface MoodAnalysisProps {
  context?: 'before_usage' | 'after_usage';
  startDate?: string;
  endDate?: string;
}

const MOOD_COLORS = {
  great: '#22c55e', // green-500
  good: '#86efac', // green-300
  neutral: '#fde047', // yellow-300
  bad: '#fca5a5', // red-300
  terrible: '#ef4444', // red-500
};

const MOOD_LABELS = {
  great: 'Great 😄',
  good: 'Good 🙂',
  neutral: 'Neutral 😐',
  bad: 'Bad 😕',
  terrible: 'Terrible 😞',
};

const MoodAnalysis = ({ context, startDate, endDate }: MoodAnalysisProps) => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [beforeAfterComparison, setBeforeAfterComparison] = useState<{
    improved: number;
    worsened: number;
    unchanged: number;
  }>({ improved: 0, worsened: 0, unchanged: 0 });

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        // Build query parameters
        let queryParams = new URLSearchParams();
        if (context) queryParams.append('context', context);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const response = await fetch(`http://localhost:5000/api/mood/analysis?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mood data');
        }

        const data = await response.json();
        
        // Process data for chart
        const processedData = Object.entries(data.moodCounts).map(([mood, count]) => ({
          mood,
          count: count as number,
          percentage: Math.round(((count as number) / data.totalEntries) * 100),
        }));

        setMoodData(processedData);
        
        // Set before/after comparison if available
        if (data.comparison) {
          setBeforeAfterComparison(data.comparison);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching mood data');
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, [context, startDate, endDate]);

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

  if (moodData.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-gray-700 rounded-md">
        No mood data available for the selected criteria.
      </div>
    );
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {context === 'before_usage' 
          ? 'Mood Before Social Media Usage' 
          : context === 'after_usage'
            ? 'Mood After Social Media Usage'
            : 'Overall Mood Analysis'}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={moodData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              nameKey="mood"
            >
              {moodData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS] || '#8884d8'} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [
                value, 
                MOOD_LABELS[name as keyof typeof MOOD_LABELS] || name
              ]}
            />
            <Legend 
              formatter={(value: string) => MOOD_LABELS[value as keyof typeof MOOD_LABELS] || value}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {!context && Object.values(beforeAfterComparison).some(val => val > 0) && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-medium mb-2">Before vs. After Social Media Usage</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-100 rounded-md">
              <div className="text-2xl font-bold text-green-600">{beforeAfterComparison.improved}%</div>
              <div className="text-sm text-gray-600">Mood Improved</div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-md">
              <div className="text-2xl font-bold text-yellow-600">{beforeAfterComparison.unchanged}%</div>
              <div className="text-sm text-gray-600">Mood Unchanged</div>
            </div>
            <div className="p-3 bg-red-100 rounded-md">
              <div className="text-2xl font-bold text-red-600">{beforeAfterComparison.worsened}%</div>
              <div className="text-sm text-gray-600">Mood Worsened</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodAnalysis;
