import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="bg-gradient-to-b from-indigo-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Take Control of Your Digital Life
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Social Friction helps you reduce social media usage, set meaningful goals, and improve your digital well-being through tracking, journaling, and insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md text-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Track Usage</h3>
              <p className="text-gray-600 text-center">
                Record the time you spend on different social media platforms to understand your habits.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Set Goals</h3>
              <p className="text-gray-600 text-center">
                Create personalized goals to reduce your social media usage over time.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Reflect & Improve</h3>
              <p className="text-gray-600 text-center">
                Journal your experiences and gain insights to build healthier digital habits.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Usage Tracking</h3>
              <p className="text-gray-600">
                Track time spent on different platforms and visualize your usage patterns.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Goal Setting</h3>
              <p className="text-gray-600">
                Set realistic goals to gradually reduce your social media consumption.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Journaling</h3>
              <p className="text-gray-600">
                Record your thoughts and feelings about your digital habits.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Insights</h3>
              <p className="text-gray-600">
                Get personalized insights and recommendations based on your usage data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who have improved their digital well-being with Social Friction.
          </p>
          <Link
            href="/auth/register"
            className="px-6 py-3 bg-white text-indigo-600 rounded-md text-lg font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </main>
  );
}
