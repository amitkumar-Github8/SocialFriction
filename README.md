# Social Friction

A full-stack web application that helps users reduce their social media usage by tracking time spent, setting personal goals, and improving digital well-being through motivation, journaling, and behavior insights.

## Project Structure

The project is organized into three main directories:

- **frontend**: Next.js application with TypeScript and Tailwind CSS
- **backend**: Node.js and Express API server
- **database**: MongoDB models and configuration

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users

### Time Tracking & Goal Setting
- Track daily social media usage across different platforms
- Set daily/weekly time limits and goals
- View historical usage data

### Analytics Dashboard
- Visualize daily social media usage with line charts
- Track goal progress with bar charts
- Monitor streaks for consistent goal achievement

### Journaling and Motivation
- Journal entries with mood tracking
- Motivational quotes for encouragement
- Reflection on digital habits

### Mood Tracking
- Track mood before and after social media use
- Analyze mood patterns and correlations
- Gain insights into emotional impact of social media

### Community Support
- Discussion forum for sharing experiences and tips
- Accountability groups for mutual support
- Group goal setting and progress tracking

## Tech Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Context API for state management

### Backend
- Node.js with Express
- TypeScript for type safety
- JWT for authentication
- Express Validator for input validation

### Database
- MongoDB with Mongoose ODM
- MongoDB Atlas for cloud hosting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-friction.git
cd social-friction
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. Start the development servers:

   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Phases

### Phase 1: Setup & Authentication
- Initialize frontend and backend
- Connect to MongoDB
- Implement JWT authentication
- Create login/signup UI and backend routes

### Phase 2: Time Logging & Goal Setting
- Implement time tracking for social media usage
- Create goal setting functionality
- Store data in MongoDB

### Phase 3: Analytics Dashboard
- Visualize usage data with charts
- Track goal progress
- Implement streak tracking

### Phase 4: Journaling and Motivation
- Create journaling feature
- Implement mood tracking
- Display motivational quotes

### Phase 5: Community Features
- Build discussion forum
- Create accountability groups
- Implement group messaging

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by digital wellbeing initiatives
- Built to promote healthier relationships with technology
