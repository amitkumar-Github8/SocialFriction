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
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Switch>
              {/* Public Routes */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              {/* Protected Routes */}
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <ProtectedRoute path="/onboarding" component={Onboarding} />
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
              <Route path="/" exact component={Home} />

              {/* Catch-all redirect */}
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </main>
          <ThemeToggle />
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;