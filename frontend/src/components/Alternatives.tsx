import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Alternative {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

const Alternatives: React.FC = () => {
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch mindful alternatives when component mounts
    const fetchAlternatives = async () => {
      try {
        setLoading(true);
        const response = await api.get('/alternatives/suggest');
        setAlternatives(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch alternatives');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternatives();
  }, []);

  // If no alternatives are available yet, provide some default ones
  useEffect(() => {
    if (!loading && alternatives.length === 0 && !error) {
      setAlternatives([
        {
          id: '1',
          title: 'Take a short walk',
          description: 'Step outside for a quick 5-10 minute walk to refresh your mind.',
          duration: '5-10 minutes',
          category: 'physical'
        },
        {
          id: '2',
          title: 'Practice deep breathing',
          description: 'Take 10 deep breaths, inhaling for 4 counts and exhaling for 6 counts.',
          duration: '2-3 minutes',
          category: 'mindfulness'
        },
        {
          id: '3',
          title: 'Read a book',
          description: 'Read a few pages of a book you enjoy instead of scrolling through social media.',
          duration: '10-15 minutes',
          category: 'learning'
        },
        {
          id: '4',
          title: 'Listen to calming music',
          description: 'Put on some relaxing music and close your eyes for a few minutes.',
          duration: '5-10 minutes',
          category: 'relaxation'
        },
        {
          id: '5',
          title: 'Do a quick meditation',
          description: 'Follow a short guided meditation to center yourself.',
          duration: '3-5 minutes',
          category: 'mindfulness'
        }
      ]);
    }
  }, [loading, alternatives, error]);

  const categories = ['all', 'physical', 'mindfulness', 'learning', 'relaxation'];

  const filteredAlternatives = selectedCategory === 'all'
    ? alternatives
    : alternatives.filter(alt => alt.category === selectedCategory);

  return (
    <div className="alternatives-container">
      <h2>Mindful Alternatives</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="category-filter">
        <p>Filter by category:</p>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading alternatives...</div>
      ) : (
        <div className="alternatives-list">
          {filteredAlternatives.length > 0 ? (
            filteredAlternatives.map(alternative => (
              <div key={alternative.id} className="alternative-card">
                <h3>{alternative.title}</h3>
                <p className="description">{alternative.description}</p>
                <div className="alternative-meta">
                  <span className="duration">{alternative.duration}</span>
                  <span className="category">{alternative.category}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No alternatives found for this category.</p>
          )}
        </div>
      )}

      <div className="alternatives-explanation">
        <h3>Why Try Alternatives?</h3>
        <p>
          When you feel the urge to engage with potentially distracting content, trying a mindful
          alternative can help break the habit loop. These activities are designed to provide a
          refreshing break while promoting wellbeing and mindfulness.
        </p>
      </div>
    </div>
  );
};

export default Alternatives;