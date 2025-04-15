// Mock data for testing when MongoDB is not available

export const mockUsers = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: '$2a$10$XJrSPMB8B5EeIU6D0.XzUOiZSRVR8bFMqCp.ZK9Xs1QYzlBtYI3Oe', // hashed 'password123'
  },
  {
    id: '2',
    username: 'demouser',
    email: 'demo@example.com',
    password: '$2a$10$XJrSPMB8B5EeIU6D0.XzUOiZSRVR8bFMqCp.ZK9Xs1QYzlBtYI3Oe', // hashed 'password123'
  },
];

export const mockRewards = [
  {
    id: '1',
    name: 'Extra Social Media Time',
    description: 'Get 15 minutes of guilt-free social media browsing',
    cost: 50,
    icon: '📱',
  },
  {
    id: '2',
    name: 'Gaming Break',
    description: 'Enjoy 30 minutes of gaming as a reward',
    cost: 100,
    icon: '🎮',
  },
  {
    id: '3',
    name: 'Movie Night',
    description: 'Treat yourself to a movie night',
    cost: 200,
    icon: '🍿',
  },
  {
    id: '4',
    name: 'Custom Reward',
    description: 'Create your own custom reward',
    cost: 150,
    icon: '🎁',
  },
];

export const mockUserCredits = {
  '1': 100, // User ID 1 has 100 credits
  '2': 250, // User ID 2 has 250 credits
};

export const mockPurchaseHistory = [
  {
    id: '1',
    userId: '1',
    rewardId: '1',
    rewardName: 'Extra Social Media Time',
    cost: 50,
    purchaseDate: new Date('2023-05-15'),
  },
  {
    id: '2',
    userId: '1',
    rewardId: '2',
    rewardName: 'Gaming Break',
    cost: 100,
    purchaseDate: new Date('2023-05-10'),
  },
];

export const mockDelaySettings = {
  '1': 30, // User ID 1 has 30 seconds delay
  '2': 60, // User ID 2 has 60 seconds delay
};

export const mockFocusSessions = [
  {
    id: '1',
    userId: '1',
    startTime: new Date('2023-05-15T10:00:00'),
    endTime: new Date('2023-05-15T11:00:00'),
    duration: 60, // minutes
    completed: true,
  },
  {
    id: '2',
    userId: '1',
    startTime: new Date('2023-05-16T14:00:00'),
    endTime: new Date('2023-05-16T15:30:00'),
    duration: 90, // minutes
    completed: true,
  },
];

export const mockMoodCheckins = [
  {
    id: '1',
    userId: '1',
    mood: 'happy',
    timestamp: new Date('2023-05-15T10:00:00'),
    notes: 'Feeling productive today',
  },
  {
    id: '2',
    userId: '1',
    mood: 'stressed',
    timestamp: new Date('2023-05-16T14:00:00'),
    notes: 'Too many notifications',
  },
];

// Helper function to get mock data for a user
export const getMockDataForUser = (userId: string) => {
  return {
    credits: mockUserCredits[userId] || 0,
    rewards: mockRewards,
    purchaseHistory: mockPurchaseHistory.filter(p => p.userId === userId),
    delaySettings: mockDelaySettings[userId] || 0,
    focusSessions: mockFocusSessions.filter(s => s.userId === userId),
    moodCheckins: mockMoodCheckins.filter(c => c.userId === userId),
  };
};
