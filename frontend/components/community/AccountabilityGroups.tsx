'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Group {
  _id: string;
  name: string;
  description: string;
  creator: {
    _id: string;
    name: string;
  };
  members: {
    _id: string;
    name: string;
  }[];
  goals: {
    platform: string;
    targetTimePerDay: number;
  }[];
  createdAt: string;
}

const AccountabilityGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [targetHours, setTargetHours] = useState('');
  const [targetMinutes, setTargetMinutes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        // Fetch all public groups
        const publicResponse = await fetch('http://localhost:5000/api/accountability/public', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!publicResponse.ok) {
          throw new Error('Failed to fetch public groups');
        }

        const publicData = await publicResponse.json();
        setGroups(publicData.data);

        // Fetch user's groups
        const myGroupsResponse = await fetch('http://localhost:5000/api/accountability/my-groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!myGroupsResponse.ok) {
          throw new Error('Failed to fetch your groups');
        }

        const myGroupsData = await myGroupsResponse.json();
        setMyGroups(myGroupsData.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const hoursNum = parseInt(targetHours || '0');
      const minutesNum = parseInt(targetMinutes || '0');
      const totalMinutes = hoursNum * 60 + minutesNum;

      if (totalMinutes <= 0) {
        setError('Target time must be greater than 0');
        setSubmitting(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/accountability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          goals: [
            {
              platform,
              targetTimePerDay: totalMinutes,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      const data = await response.json();
      
      // Add new group to my groups
      setMyGroups([data.data, ...myGroups]);
      
      // Reset form
      setName('');
      setDescription('');
      setPlatform('');
      setTargetHours('');
      setTargetMinutes('');
      setShowNewGroupForm(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating group');
    } finally {
      setSubmitting(false);
    }
  };

  const joinGroup = async (groupId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/accountability/${groupId}/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to join group');
      }

      const data = await response.json();
      
      // Update groups lists
      const updatedGroup = data.data;
      setGroups(groups.filter(g => g._id !== groupId));
      setMyGroups([...myGroups, updatedGroup]);
    } catch (err: any) {
      setError(err.message || 'An error occurred while joining group');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Helper function to format minutes into hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Accountability Groups</h2>
        <button
          onClick={() => setShowNewGroupForm(!showNewGroupForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {showNewGroupForm ? 'Cancel' : 'Create Group'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {showNewGroupForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create New Accountability Group</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Group Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="platform" className="block text-gray-700 mb-2">
                Platform
              </label>
              <input
                type="text"
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Instagram, Facebook, etc."
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Target Time Per Day</label>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="targetHours" className="block text-sm text-gray-600 mb-1">
                    Hours
                  </label>
                  <input
                    type="number"
                    id="targetHours"
                    value={targetHours}
                    onChange={(e) => setTargetHours(e.target.value)}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="targetMinutes" className="block text-sm text-gray-600 mb-1">
                    Minutes
                  </label>
                  <input
                    type="number"
                    id="targetMinutes"
                    value={targetMinutes}
                    onChange={(e) => setTargetMinutes(e.target.value)}
                    min="0"
                    max="59"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Group'}
            </button>
          </form>
        </div>
      )}

      {myGroups.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Groups</h3>
          <div className="space-y-4">
            {myGroups.map((group) => (
              <div key={group._id} className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-2">
                  <Link href={`/community/groups/${group._id}`} className="text-indigo-600 hover:text-indigo-800">
                    {group.name}
                  </Link>
                </h4>
                <p className="text-gray-700 mb-4">{group.description}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  {group.goals.map((goal, index) => (
                    <div key={index} className="px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm">
                      <span className="font-medium">{goal.platform}:</span> {formatTime(goal.targetTimePerDay)} / day
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{group.members.length} members</span>
                  <span className="mx-2">•</span>
                  <span>Created by {group.creator.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Available Groups</h3>
      {groups.length === 0 ? (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-600">No available groups found. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group._id} className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold mb-2">{group.name}</h4>
                  <p className="text-gray-700 mb-4">{group.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {group.goals.map((goal, index) => (
                      <div key={index} className="px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm">
                        <span className="font-medium">{goal.platform}:</span> {formatTime(goal.targetTimePerDay)} / day
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{group.members.length} members</span>
                    <span className="mx-2">•</span>
                    <span>Created by {group.creator.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => joinGroup(group._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountabilityGroups;
