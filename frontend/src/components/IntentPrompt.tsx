import React, { useState } from 'react';
import api from '../services/api';

const IntentPrompt: React.FC = () => {
  const [intent, setIntent] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!intent.trim()) {
      setError('Please enter your intent');
      return;
    }

    try {
      await api.post('/intent/clarify-intent', { intent });
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Failed to submit intent');
      console.error(err);
    }
  };

  const handleReset = () => {
    setIntent('');
    setSubmitted(false);
    setError('');
  };

  const commonIntents = [
    'Research for work/school',
    'Check social media updates',
    'Entertainment/relaxation',
    'Shopping',
    'Learning something new',
    'Communication with friends/family'
  ];

  const handleIntentSelect = (selectedIntent: string) => {
    setIntent(selectedIntent);
  };

  return (
    <div className="intent-prompt-container">
      <h2>Intent Clarification</h2>
      {error && <div className="error-message">{error}</div>}

      {submitted ? (
        <div className="success-message">
          <p>Thank you for clarifying your intent!</p>
          <p>Your stated intent: {intent}</p>
          <button onClick={handleReset}>Clarify Again</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>What is your purpose for accessing this site?</p>

          <div className="common-intents">
            <p>Common intents:</p>
            <div className="intent-options">
              {commonIntents.map((commonIntent) => (
                <div
                  key={commonIntent}
                  className={`intent-option ${intent === commonIntent ? 'selected' : ''}`}
                  onClick={() => handleIntentSelect(commonIntent)}
                >
                  {commonIntent}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="intent">Or describe your intent:</label>
            <textarea
              id="intent"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="I am accessing this site to..."
              rows={3}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      <div className="intent-explanation">
        <h3>Why Clarify Intent?</h3>
        <p>
          Taking a moment to clarify why you're accessing a site helps you make more conscious
          decisions about your online activities. It encourages mindful browsing and can help
          you avoid mindless scrolling or distraction.
        </p>
      </div>
    </div>
  );
};

export default IntentPrompt;