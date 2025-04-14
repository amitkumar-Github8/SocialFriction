import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import DelayTime from './components/DelayTime';
import MoodCheckIn from './components/MoodCheckIn';
import IntentPrompt from './components/IntentPrompt';
import TimeBudget from './components/TimeBudget';
import Alternatives from './components/Alternatives';
import FocusMode from './components/FocusMode';
import HabitReport from './components/HabitReport';
import Suggestions from './components/Suggestions';
import Rewards from './components/Rewards';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* Protected Routes */}
          <ProtectedRoute path="/delay" component={DelayTime} />
          <ProtectedRoute path="/mood-check-in" component={MoodCheckIn} />
          <ProtectedRoute path="/intent-prompt" component={IntentPrompt} />
          <ProtectedRoute path="/time-budget" component={TimeBudget} />
          <ProtectedRoute path="/alternatives" component={Alternatives} />
          <ProtectedRoute path="/focus-mode" component={FocusMode} />
          <ProtectedRoute path="/habit-report" component={HabitReport} />
          <ProtectedRoute path="/suggestions" component={Suggestions} />
          <ProtectedRoute path="/rewards" component={Rewards} />

          {/* Home Route */}
          <Route path="/" exact>
            <div className="home-container">
              <h1>Welcome to Social Friction</h1>
              <p>A mindful approach to digital wellbeing</p>
              <div className="home-buttons">
                <a href="/login" className="btn btn-primary">Login</a>
                <a href="/register" className="btn btn-secondary">Register</a>
              </div>
            </div>
          </Route>

          {/* Catch-all redirect */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;