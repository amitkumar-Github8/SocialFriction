import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/Onboarding.css';

const Onboarding: React.FC = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [digitalGoals, setDigitalGoals] = useState<string[]>([]);
  const [distractingApps, setDistractingApps] = useState<string[]>([]);
  const [focusTime, setFocusTime] = useState(25);
  const [delayTime, setDelayTime] = useState(30);
  
  const totalSteps = 4;
  
  const handleGoalToggle = (goal: string) => {
    if (digitalGoals.includes(goal)) {
      setDigitalGoals(digitalGoals.filter(g => g !== goal));
    } else {
      setDigitalGoals([...digitalGoals, goal]);
    }
  };
  
  const handleAppToggle = (app: string) => {
    if (distractingApps.includes(app)) {
      setDistractingApps(distractingApps.filter(a => a !== app));
    } else {
      setDistractingApps([...distractingApps, app]);
    }
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      
      // In a real app, you would send this data to your API
      // For now, we'll just simulate a successful API call
      
      // const response = await api.post('/user/onboarding', {
      //   digitalGoals,
      //   distractingApps,
      //   focusTime,
      //   delayTime
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard
      history.push('/dashboard');
      
    } catch (err) {
      console.error('Onboarding error:', err);
      setError('Failed to save your preferences. Please try again.');
      setLoading(false);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="onboarding-step">
            <h2>Welcome to Social Friction!</h2>
            <p className="step-description">
              Let's set up your digital wellbeing journey. What are your main goals?
            </p>
            
            <div className="goals-grid">
              <div 
                className={`goal-card ${digitalGoals.includes('reduce_time') ? 'selected' : ''}`}
                onClick={() => handleGoalToggle('reduce_time')}
              >
                <div className="goal-icon">⏱️</div>
                <h3>Reduce Screen Time</h3>
                <p>Spend less time on distracting apps and websites</p>
              </div>
              
              <div 
                className={`goal-card ${digitalGoals.includes('improve_focus') ? 'selected' : ''}`}
                onClick={() => handleGoalToggle('improve_focus')}
              >
                <div className="goal-icon">🎯</div>
                <h3>Improve Focus</h3>
                <p>Enhance concentration during work or study sessions</p>
              </div>
              
              <div 
                className={`goal-card ${digitalGoals.includes('mindful_usage') ? 'selected' : ''}`}
                onClick={() => handleGoalToggle('mindful_usage')}
              >
                <div className="goal-icon">🧠</div>
                <h3>Mindful Usage</h3>
                <p>Be more intentional about how you use technology</p>
              </div>
              
              <div 
                className={`goal-card ${digitalGoals.includes('better_habits') ? 'selected' : ''}`}
                onClick={() => handleGoalToggle('better_habits')}
              >
                <div className="goal-icon">📊</div>
                <h3>Better Habits</h3>
                <p>Develop healthier digital habits and routines</p>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="onboarding-step">
            <h2>Which apps distract you the most?</h2>
            <p className="step-description">
              Select the apps you want to add friction to:
            </p>
            
            <div className="apps-grid">
              <div 
                className={`app-card ${distractingApps.includes('instagram') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('instagram')}
              >
                <div className="app-icon">📸</div>
                <h3>Instagram</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('facebook') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('facebook')}
              >
                <div className="app-icon">👥</div>
                <h3>Facebook</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('twitter') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('twitter')}
              >
                <div className="app-icon">🐦</div>
                <h3>Twitter</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('tiktok') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('tiktok')}
              >
                <div className="app-icon">🎵</div>
                <h3>TikTok</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('youtube') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('youtube')}
              >
                <div className="app-icon">▶️</div>
                <h3>YouTube</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('netflix') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('netflix')}
              >
                <div className="app-icon">🎬</div>
                <h3>Netflix</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('games') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('games')}
              >
                <div className="app-icon">🎮</div>
                <h3>Games</h3>
              </div>
              
              <div 
                className={`app-card ${distractingApps.includes('other') ? 'selected' : ''}`}
                onClick={() => handleAppToggle('other')}
              >
                <div className="app-icon">➕</div>
                <h3>Other</h3>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="onboarding-step">
            <h2>Set Your Focus Time</h2>
            <p className="step-description">
              How long would you like your focus sessions to be?
            </p>
            
            <div className="focus-time-selector">
              <div className="time-display">
                <span className="time-value">{focusTime}</span>
                <span className="time-unit">minutes</span>
              </div>
              
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={focusTime}
                onChange={(e) => setFocusTime(parseInt(e.target.value))}
                className="time-slider"
              />
              
              <div className="time-presets">
                <button 
                  className={focusTime === 15 ? 'active' : ''} 
                  onClick={() => setFocusTime(15)}
                >
                  15m
                </button>
                <button 
                  className={focusTime === 25 ? 'active' : ''} 
                  onClick={() => setFocusTime(25)}
                >
                  25m
                </button>
                <button 
                  className={focusTime === 45 ? 'active' : ''} 
                  onClick={() => setFocusTime(45)}
                >
                  45m
                </button>
                <button 
                  className={focusTime === 60 ? 'active' : ''} 
                  onClick={() => setFocusTime(60)}
                >
                  60m
                </button>
              </div>
            </div>
            
            <div className="focus-info">
              <h3>What is a Focus Session?</h3>
              <p>
                During a focus session, Social Friction will help you stay focused by blocking 
                distracting apps and websites. You'll earn reward credits for each completed session.
              </p>
              <p>
                <strong>Recommended:</strong> 25 minutes (Pomodoro Technique)
              </p>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="onboarding-step">
            <h2>Set Your Delay Time</h2>
            <p className="step-description">
              How long would you like to delay access to distracting apps?
            </p>
            
            <div className="delay-time-selector">
              <div className="time-display">
                <span className="time-value">{delayTime}</span>
                <span className="time-unit">seconds</span>
              </div>
              
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={delayTime}
                onChange={(e) => setDelayTime(parseInt(e.target.value))}
                className="time-slider"
              />
              
              <div className="time-presets">
                <button 
                  className={delayTime === 10 ? 'active' : ''} 
                  onClick={() => setDelayTime(10)}
                >
                  10s
                </button>
                <button 
                  className={delayTime === 20 ? 'active' : ''} 
                  onClick={() => setDelayTime(20)}
                >
                  20s
                </button>
                <button 
                  className={delayTime === 30 ? 'active' : ''} 
                  onClick={() => setDelayTime(30)}
                >
                  30s
                </button>
                <button 
                  className={delayTime === 60 ? 'active' : ''} 
                  onClick={() => setDelayTime(60)}
                >
                  60s
                </button>
              </div>
            </div>
            
            <div className="delay-info">
              <h3>What is Delay Time?</h3>
              <p>
                Delay time adds a waiting period before you can access distracting apps. 
                This small friction helps you make more mindful decisions about your app usage.
              </p>
              <p>
                <strong>Recommended:</strong> 30 seconds (enough to reconsider, not too frustrating)
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="onboarding-container">
      <div className="onboarding-progress">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`progress-step ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      
      {renderStep()}
      
      {error && <div className="onboarding-error">{error}</div>}
      
      <div className="onboarding-actions">
        {currentStep > 1 && (
          <button 
            className="btn-secondary" 
            onClick={handleBack}
            disabled={loading}
          >
            Back
          </button>
        )}
        
        <button 
          className="btn-primary" 
          onClick={handleNext}
          disabled={loading}
        >
          {currentStep === totalSteps ? (loading ? 'Saving...' : 'Finish Setup') : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
