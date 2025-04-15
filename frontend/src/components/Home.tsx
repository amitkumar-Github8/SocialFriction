import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (currentUser) {
      history.push('/dashboard');
    }
  }, [currentUser, history]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Social Friction</h1>
        <p className="hero-subtitle">A mindful approach to digital wellbeing</p>

        <div className="home-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>How Social Friction Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Delay Time</h3>
            <p>Set intentional delays before accessing distracting apps and websites.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">😌</div>
            <h3>Mood Check-In</h3>
            <p>Track how different digital activities affect your emotional wellbeing.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Intent Prompt</h3>
            <p>Clarify your purpose before engaging with potentially distracting content.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Focus Mode</h3>
            <p>Block distractions and stay productive with customizable focus sessions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Rewards</h3>
            <p>Earn credits for mindful digital habits and redeem them for rewards.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Habit Reports</h3>
            <p>Gain insights into your digital habits with detailed analytics.</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"Social Friction has completely transformed my relationship with social media. I'm more intentional and less anxious."</p>
            <p className="testimonial-author">- Alex P.</p>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"The delay feature alone has saved me countless hours of mindless scrolling. Highly recommend!"</p>
            <p className="testimonial-author">- Jamie L.</p>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"I love how this app doesn't try to eliminate technology from my life, but helps me use it more mindfully."</p>
            <p className="testimonial-author">- Sam K.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Take Control of Your Digital Life?</h2>
        <p>Join thousands of users who have improved their digital wellbeing with Social Friction.</p>
        <Link to="/register" className="btn btn-primary btn-large">Get Started Today</Link>
      </div>
    </div>
  );
};

export default Home;
