import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUsers } from './api/users/usersRequests';


jest.mock('./api/userRequests');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users 7 times and display them', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' }];
    getUsers.mockResolvedValue(mockUsers);
    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(getUsers).toHaveBeenCalledTimes(7);

    expect(screen.getAllByRole('listitem')).toHaveLength(7);
  });

  it('should handle errors when fetching users', async () => {
    getUsers.mockRejectedValue(new Error('Failed to fetch users'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
  });

  it('should handle empty responses', async () => {
    getUsers.mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});