'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const MOODS = [
  { value: 'great', label: 'Great 😄', color: 'bg-green-500' },
  { value: 'good', label: 'Good 🙂', color: 'bg-green-300' },
  { value: 'neutral', label: 'Neutral 😐', color: 'bg-yellow-300' },
  { value: 'bad', label: 'Bad 😕', color: 'bg-red-300' },
  { value: 'terrible', label: 'Terrible 😞', color: 'bg-red-500' },
];

interface MoodTrackerProps {
  context: 'before_usage' | 'after_usage';
}

const MoodTracker = ({ context }: MoodTrackerProps) => {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!mood) {
      setError('Please select a mood');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood,
          context,
          notes,
          date: new Date(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save mood data');
      }

      setSuccess('Mood recorded successfully!');
      
      // Reset form
      setMood('');
      setNotes('');
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving mood data');
    } finally {
      setLoading(false);
    }
  };

  const contextTitle = context === 'before_usage' 
    ? 'How are you feeling before using social media?' 
    : 'How are you feeling after using social media?';

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800">{contextTitle}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{success}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-3">Select your mood:</label>
          <div className="grid grid-cols-5 gap-2">
            {MOODS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                className={`p-2 rounded-md text-center transition-all ${
                  mood === m.value 
                    ? `${m.color} text-white ring-2 ring-offset-2 ring-indigo-500` 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{m.label.split(' ')[1]}</div>
                <div className="text-xs">{m.label.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="block text-gray-700 mb-2">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="How are you feeling and why?"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={loading || !mood}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Record Mood'}
        </button>
      </form>
    </div>
  );
};

export default MoodTracker;
