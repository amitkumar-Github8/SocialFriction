import Layout from '../components/layout/Layout';
import UsageChart from '../components/analytics/UsageChart';
import GoalProgress from '../components/analytics/GoalProgress';
import StreakTracker from '../components/analytics/StreakTracker';
import MoodAnalysis from '../components/mood/MoodAnalysis';
import MotivationalQuote from '../components/motivation/MotivationalQuote';

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        <div className="mb-8">
          <MotivationalQuote category="digital-wellbeing" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UsageChart />
          <GoalProgress />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <StreakTracker />
          <MoodAnalysis />
        </div>
      </div>
    </Layout>
  );
}
