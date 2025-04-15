import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Dashboard.css';

interface UserStats {
  focusSessions: number;
  totalFocusTime: number;
  delayedApps: number;
  credits: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
}

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    focusSessions: 0,
    totalFocusTime: 0,
    delayedApps: 0,
    credits: 0
  });
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch this data from your API
        // For now, we'll use mock data
        
        // Mock API call for user stats
        // const statsResponse = await api.get('/user/stats');
        // setStats(statsResponse.data);
        
        // Mock API call for recent activities
        // const activitiesResponse = await api.get('/user/activities');
        // setActivities(activitiesResponse.data);
        
        // Mock data for demonstration
        setStats({
          focusSessions: 12,
          totalFocusTime: 360, // minutes
          delayedApps: 8,
          credits: 250
        });
        
        setActivities([
          {
            id: '1',
            type: 'focus',
            description: 'Completed a 30-minute focus session',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            id: '2',
            type: 'delay',
            description: 'Added a 30-second delay to Instagram',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
          },
          {
            id: '3',
            type: 'reward',
            description: 'Earned 50 credits for completing daily goals',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
          },
          {
            id: '4',
            type: 'mood',
            description: 'Logged feeling "productive" after focus session',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format minutes into hours and minutes
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  // Get icon for activity type
  const getActivityIcon = (type: string): string => {
    switch (type) {
      case 'focus':
        return '🎯';
      case 'delay':
        return '⏱️';
      case 'reward':
        return '🏆';
      case 'mood':
        return '😊';
      default:
        return '📝';
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.username || 'User'}!</h1>
        <p className="dashboard-subtitle">Here's your digital wellbeing overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{stats.focusSessions}</div>
          <div className="stat-label">Focus Sessions</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{formatTime(stats.totalFocusTime)}</div>
          <div className="stat-label">Total Focus Time</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📱</div>
          <div className="stat-value">{stats.delayedApps}</div>
          <div className="stat-label">Apps with Delay</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{stats.credits}</div>
          <div className="stat-label">Reward Credits</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/focus-mode" className="action-card">
              <div className="action-icon">🎯</div>
              <h3>Start Focus Session</h3>
              <p>Block distractions and focus on your work</p>
            </Link>
            
            <Link to="/delay" className="action-card">
              <div className="action-icon">⏱️</div>
              <h3>Set App Delays</h3>
              <p>Add friction to distracting apps</p>
            </Link>
            
            <Link to="/mood-check-in" className="action-card">
              <div className="action-icon">😊</div>
              <h3>Mood Check-In</h3>
              <p>Track how digital activities affect your mood</p>
            </Link>
            
            <Link to="/rewards" className="action-card">
              <div className="action-icon">🏆</div>
              <h3>Redeem Rewards</h3>
              <p>Use your earned credits for rewards</p>
            </Link>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {activities.length > 0 ? (
              activities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                  <div className="activity-content">
                    <div className="activity-description">{activity.description}</div>
                    <div className="activity-time">{formatRelativeTime(activity.timestamp)}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activities">No recent activities to show.</p>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Digital Wellbeing Journey</h2>
        <div className="journey-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <div className="progress-label">65% towards your weekly goal</div>
        </div>
        <div className="journey-steps">
          <div className="journey-step completed">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Set Up Delay Time</h4>
              <p>Add friction to distracting apps</p>
            </div>
          </div>
          
          <div className="journey-step completed">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Complete Focus Session</h4>
              <p>Stay focused for 25+ minutes</p>
            </div>
          </div>
          
          <div className="journey-step active">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Track Your Mood</h4>
              <p>Log how you feel after using apps</p>
            </div>
          </div>
          
          <div className="journey-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Redeem a Reward</h4>
              <p>Use your earned credits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
