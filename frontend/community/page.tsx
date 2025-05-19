import { useState } from 'react';
import Layout from '../components/layout/Layout';
import CommunityForum from '../components/community/CommunityForum';
import AccountabilityGroups from '../components/community/AccountabilityGroups';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'forum' | 'groups'>('forum');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Community</h1>
        
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('forum')}
                className={`${
                  activeTab === 'forum'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
              >
                Discussion Forum
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`${
                  activeTab === 'groups'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
              >
                Accountability Groups
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'forum' ? (
          <CommunityForum />
        ) : (
          <AccountabilityGroups />
        )}
        
        <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
          <div className="prose max-w-none">
            <p>
              Our community is dedicated to supporting each other in building healthier digital habits. Please follow these guidelines:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <strong>Be Respectful:</strong> Treat others with kindness and respect, even when you disagree.
              </li>
              <li>
                <strong>Be Supportive:</strong> We're all here to improve our relationship with technology.
              </li>
              <li>
                <strong>Protect Privacy:</strong> Don't share personal information about yourself or others.
              </li>
              <li>
                <strong>No Promotion:</strong> Don't promote products, services, or other platforms.
              </li>
              <li>
                <strong>Stay On Topic:</strong> Keep discussions related to digital well-being and social media usage.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
