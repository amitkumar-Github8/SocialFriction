import Layout from '../components/layout/Layout';
import MoodTracker from '../components/mood/MoodTracker';
import MoodAnalysis from '../components/mood/MoodAnalysis';

export default function MoodPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mood Tracking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <MoodTracker context="before_usage" />
          <MoodTracker context="after_usage" />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Mood Patterns</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MoodAnalysis context="before_usage" />
            <MoodAnalysis context="after_usage" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Track Your Mood?</h2>
          <div className="prose max-w-none">
            <p>
              Tracking your mood before and after social media usage can help you understand how these platforms affect your emotional well-being. Research shows that excessive social media use can impact mental health in various ways:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <strong>Social Comparison:</strong> Seeing carefully curated highlights of others' lives can lead to negative self-comparison.
              </li>
              <li>
                <strong>FOMO (Fear of Missing Out):</strong> Seeing activities you weren't included in can trigger feelings of exclusion.
              </li>
              <li>
                <strong>Dopamine Loops:</strong> Social media is designed to trigger dopamine releases, creating addictive patterns.
              </li>
              <li>
                <strong>Reduced Face-to-Face Interaction:</strong> Online connections may replace in-person social interactions that are vital for well-being.
              </li>
            </ul>
            <p className="mt-4">
              By tracking your mood, you can identify patterns and make more informed decisions about your social media usage.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
