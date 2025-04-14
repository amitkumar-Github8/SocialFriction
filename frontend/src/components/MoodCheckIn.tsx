import React, { useState } from 'react';
import api from '../services/api';

const MoodCheckIn: React.FC = () => {
  const [mood, setMood] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const moods = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'angry', label: 'Angry', emoji: '😠' },
    { value: 'bored', label: 'Bored', emoji: '😒' },
  ];

  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mood) {
      setError('Please select a mood');
      return;
    }

    try {
      await api.post('/mood/check-in', { mood });
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Failed to submit mood check-in');
      console.error(err);
    }
  };

  const handleReset = () => {
    setMood('');
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="mood-check-in-container">
      <h2>Mood Check-In</h2>
      {error && <div className="error-message">{error}</div>}

      {submitted ? (
        <div className="success-message">
          <p>Thank you for checking in your mood!</p>
          <p>You selected: {moods.find(m => m.value === mood)?.label} {moods.find(m => m.value === mood)?.emoji}</p>
          <button onClick={handleReset}>Check In Again</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>How are you feeling right now?</p>
          <div className="mood-options">
            {moods.map((m) => (
              <div
                key={m.value}
                className={`mood-option ${mood === m.value ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(m.value)}
              >
                <div className="mood-emoji">{m.emoji}</div>
                <div className="mood-label">{m.label}</div>
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="mood-explanation">
        <h3>Why Check In?</h3>
        <p>
          Being aware of your mood before accessing certain sites can help you make more mindful
          decisions about your online activities. It encourages self-reflection and emotional
          awareness, which are key components of digital wellbeing.
        </p>
      </div>
    </div>
  );
};

export default MoodCheckIn;