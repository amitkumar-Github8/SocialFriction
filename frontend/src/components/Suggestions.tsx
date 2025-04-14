import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [implementedSuggestions, setImplementedSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch AI-powered suggestions when component mounts
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/suggestions');
        setSuggestions(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch suggestions');
        console.error(err);
        // Set demo data if API fails
        setDemoData();
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();

    // Load implemented suggestions from localStorage
    const savedImplemented = localStorage.getItem('implementedSuggestions');
    if (savedImplemented) {
      setImplementedSuggestions(JSON.parse(savedImplemented));
    }
  }, []);

  const setDemoData = () => {
    const demoSuggestions: Suggestion[] = [
      {
        id: '1',
        title: 'Set specific time blocks for social media',
        description: 'Instead of checking social media throughout the day, allocate specific time blocks (e.g., 15 minutes in the morning and evening) to catch up on updates.',
        category: 'time management',
        difficulty: 'medium'
      },
      {
        id: '2',
        title: 'Enable grayscale mode on your phone',
        description: 'Colorful app icons are designed to grab your attention. Using grayscale mode can reduce the visual appeal of distracting apps.',
        category: 'digital minimalism',
        difficulty: 'easy'
      },
      {
        id: '3',
        title: 'Create a morning routine without screens',
        description: 'Start your day with activities like meditation, reading, or exercise instead of immediately checking your phone.',
        category: 'habit building',
        difficulty: 'medium'
      },
      {
        id: '4',
        title: 'Use website blockers during focus time',
        description: 'Install browser extensions that block distracting websites during your designated work or study hours.',
        category: 'productivity',
        difficulty: 'easy'
      },
      {
        id: '5',
        title: 'Practice the 20-20-20 rule for eye strain',
        description: 'Every 20 minutes, look at something 20 feet away for 20 seconds to reduce digital eye strain.',
        category: 'health',
        difficulty: 'easy'
      }
    ];
    setSuggestions(demoSuggestions);
  };

  const handleImplement = (id: string) => {
    if (implementedSuggestions.includes(id)) {
      // Un-implement suggestion
      const updated = implementedSuggestions.filter(suggId => suggId !== id);
      setImplementedSuggestions(updated);
      localStorage.setItem('implementedSuggestions', JSON.stringify(updated));
    } else {
      // Implement suggestion
      const updated = [...implementedSuggestions, id];
      setImplementedSuggestions(updated);
      localStorage.setItem('implementedSuggestions', JSON.stringify(updated));
    }
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'orange';
      case 'hard':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="suggestions-container">
      <h2>AI-Powered Suggestions</h2>
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading suggestions...</div>
      ) : (
        <div className="suggestions-list">
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className={`suggestion-card ${implementedSuggestions.includes(suggestion.id) ? 'implemented' : ''}`}
            >
              <div className="suggestion-header">
                <h3>{suggestion.title}</h3>
                <span
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(suggestion.difficulty) }}
                >
                  {suggestion.difficulty}
                </span>
              </div>
              <p className="description">{suggestion.description}</p>
              <div className="suggestion-footer">
                <span className="category">{suggestion.category}</span>
                <button
                  className={`implement-btn ${implementedSuggestions.includes(suggestion.id) ? 'implemented' : ''}`}
                  onClick={() => handleImplement(suggestion.id)}
                >
                  {implementedSuggestions.includes(suggestion.id) ? 'Implemented ✓' : 'Implement'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="suggestions-explanation">
        <h3>About AI-Powered Suggestions</h3>
        <p>
          These suggestions are personalized based on your digital habits and behavior patterns.
          They are designed to help you develop healthier relationships with technology and
          improve your digital wellbeing. Try implementing one suggestion at a time and track
          your progress.
        </p>
      </div>
    </div>
  );
};

export default Suggestions;