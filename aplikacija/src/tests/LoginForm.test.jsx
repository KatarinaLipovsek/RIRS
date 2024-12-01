import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm'; // Adjust the import path if necessary
import axios from 'axios';



// Mock axios to avoid actual HTTP requests during testing
jest.mock('axios');

describe('LoginForm Component', () => {

  // Test form submission with valid credentials
  it('should submit the form and call onLogin on successful login', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    const mockResponse = { data: { success: true, user: mockUser } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const onLoginMock = jest.fn();
    render(<LoginForm onLogin={onLoginMock} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Submit the form (using getByRole to specifically target the Login button)
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Wait for the axios call and check if onLogin is called with correct user data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/login', {
        username: 'johndoe',
        password: 'password123',
      });
      expect(onLoginMock).toHaveBeenCalledWith(mockUser);
    });
  });
});
