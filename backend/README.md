# Social Friction Backend

## Overview
Social Friction is a web application designed to help users manage their online habits and promote mindfulness through various features. The backend of the application is built using TypeScript and Node.js, providing a robust API for the frontend to interact with.

## Features
- **Progressive Delay Time**: Implements a delay mechanism to help users manage their time spent on distracting websites.
- **Mood Check-In Before Unlock**: Prompts users to check in on their mood before accessing certain sites, encouraging self-reflection.
- **Intent Clarification Prompt**: Asks users to clarify their intent before accessing sites, promoting mindful usage.
- **Time Budgeting System**: Allows users to set time budgets for their online activities, helping them stay within their limits.
- **Mindful Alternatives**: Suggests alternative activities during delays to encourage more productive use of time.
- **Focus Mode/Pomodoro Timer**: Implements a focus mode with a Pomodoro timer to enhance productivity.
- **Weekly Habit Report**: Generates reports on user habits to provide insights into their online behavior.
- **AI-Powered Suggestions**: Offers personalized suggestions based on user behavior to improve their online experience.
- **Focus Credit System**: Gamifies the experience by rewarding users with focus credits for maintaining good habits.

## Project Structure
- **src/**: Contains the source code for the backend application.
  - **app.ts**: Entry point of the application.
  - **controllers/**: Contains controllers for handling business logic.
  - **routes/**: Defines API routes for the application.
  - **models/**: Contains data models for user and habit management.
  - **types/**: TypeScript types and interfaces used throughout the application.
- **package.json**: Lists dependencies and scripts for the backend.
- **tsconfig.json**: TypeScript configuration file for the backend.

## Getting Started
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.