# Social Friction

Social Friction is a web application designed to help users manage their online activities mindfully. The application incorporates various features aimed at promoting focus, self-awareness, and healthy digital habits.

## Overview

Social Friction provides a comprehensive dashboard that integrates all features in one place, making it easy for users to track their progress, access features, and view their digital wellbeing journey. The application includes a guided onboarding process for new users and a cohesive user experience that connects all features.

## Features

### Core Features

- **Unified Dashboard**: A central hub that displays user stats, quick actions, recent activity, and progress tracking.

- **User Onboarding**: A guided setup process for new users to personalize their experience based on their goals and preferences.

- **Progressive Delay Time**: Gradually increases the time required to access distracting websites, encouraging users to reflect on their choices.

- **Mood Check-In Before Unlock**: Users are prompted to check in on their mood before accessing certain sites, fostering self-awareness and emotional regulation.

- **Intent Clarification Prompt**: Before accessing a site, users are asked to clarify their intent, helping them to make more conscious decisions about their online activities.

- **Time Budgeting System**: Users can set time limits for their online activities, promoting healthier usage patterns and preventing overindulgence.

- **Mindful Alternatives**: During delays, users are presented with mindful alternatives to engage in, encouraging healthier habits.

- **Focus Mode/Pomodoro Timer**: A built-in focus mode that utilizes the Pomodoro technique to help users maintain concentration and productivity.

- **Weekly Habit Report**: Users receive reports summarizing their online habits, helping them track progress and identify areas for improvement.

- **AI-Powered Suggestions**: The application provides personalized suggestions based on user behavior, promoting better decision-making and healthier habits.

- **Focus Credit System**: A gamified rewards system that incentivizes users to stay focused and adhere to their time budgets, enhancing motivation and engagement.

### User Experience Features

- **Responsive Design**: The application is fully responsive and works well on desktop, tablet, and mobile devices.

- **Dark/Light Mode**: Users can switch between dark and light themes based on their preference.

- **Guided User Journey**: A step-by-step approach to feature adoption that creates a sense of progression and achievement.

- **Integrated Features**: All features work together seamlessly to provide a cohesive experience.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/amitkumar-Github8/SocialFriction.git
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Set up environment variables:
   - Copy the `.env.example` file in the backend directory to a new file named `.env`
   - Update the `.env` file with your own values:
     ```
     # MongoDB Connection String
     MONGODB_URI=mongodb://localhost:27017/social-friction

     # JWT Secret Key (use a strong random string in production)
     JWT_SECRET=your_jwt_secret_key_here

     # Server Port
     PORT=3000

     # Node Environment
     NODE_ENV=development
     ```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `social-friction`
   - Update the `MONGODB_URI` in your `.env` file with your MongoDB connection string

2. Start the backend server:

   **Using batch file (Windows):**
   ```
   cd backend
   start.bat
   ```

   **Using npm commands:**
   ```
   cd backend
   npm start
   ```
   Or for development with auto-reload:
   ```
   cd backend
   npm run dev
   ```
   The backend server will run on `http://localhost:3000`.

3. Start the frontend application:

   **Using batch file (Windows):**
   ```
   cd frontend
   start.bat
   ```

   **Using npm commands:**
   ```
   cd frontend
   npm start
   ```
   The frontend application will run on `http://localhost:3001`.

### Troubleshooting

If you encounter the error `error:0308010C:digital envelope routines::unsupported` when starting the frontend, it's because you're using Node.js v17 or higher with an older version of React Scripts. Here are several ways to fix it:

1. **Use the provided batch files**: The included batch files (start.bat) are already configured to use the legacy OpenSSL provider.

2. **Use the provided scripts**: The package.json is already configured to use the legacy OpenSSL provider.

3. **Set the environment variable manually**:
   ```
   # Windows (CMD)
   set NODE_OPTIONS=--openssl-legacy-provider && npm start

   # Windows (PowerShell)
   $env:NODE_OPTIONS="--openssl-legacy-provider"; npm start

   # Linux/macOS
   NODE_OPTIONS=--openssl-legacy-provider npm start
   ```

4. **Downgrade Node.js**: Use Node.js v16 instead of v17 or higher.

### MongoDB Connection Issues

If you're having trouble connecting to MongoDB, the application will still work with mock data. This allows you to test and develop without a database connection.

### Testing

1. Run backend tests:
   ```
   cd backend
   npm test
   ```

2. Run frontend tests:
   ```
   cd frontend
   npm test
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.