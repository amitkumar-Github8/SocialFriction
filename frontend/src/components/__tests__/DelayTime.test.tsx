import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DelayTime from '../DelayTime';
import api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('DelayTime Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('renders DelayTime component correctly', () => {
    // Mock API response
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { delayTime: 5 } });

    render(<DelayTime />);
    
    // Check if the component renders correctly
    expect(screen.getByText(/Progressive Delay/i)).toBeInTheDocument();
    expect(screen.getByText(/What is Progressive Delay?/i)).toBeInTheDocument();
  });

  test('fetches and displays delay time on mount', async () => {
    // Mock API response
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { delayTime: 10 } });

    render(<DelayTime />);
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/delay/get-progressive-delay');
      expect(screen.getByText(/Current delay time: 10 minutes/i)).toBeInTheDocument();
    });
  });

  test('starts delay when button is clicked', async () => {
    // Mock API responses
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { delayTime: 5 } });
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { delayTime: 10 } });

    render(<DelayTime />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText(/Current delay time: 5 minutes/i)).toBeInTheDocument();
    });

    // Click the start delay button
    fireEvent.click(screen.getByText('Start Delay'));
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/delay/set-progressive-delay');
      expect(screen.getByText(/Time remaining:/i)).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    // Mock API error
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<DelayTime />);
    
    // Wait for the API call to reject
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/delay/get-progressive-delay');
      expect(screen.getByText(/Failed to fetch delay time/i)).toBeInTheDocument();
    });
  });
});
