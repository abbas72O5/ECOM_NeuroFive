import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login';

describe('Login Component', () => {
  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <Login setAuthUser={vi.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter 'user', 'seller1', or 'seller2'")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows the user to type in the username field', () => {
    render(
      <BrowserRouter>
        <Login setAuthUser={vi.fn()} />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Enter 'user', 'seller1', or 'seller2'");
    fireEvent.change(input, { target: { value: 'user' } });
    expect(input.value).toBe('user');
  });

  it('shows loading state when submitting', () => {
    render(
      <BrowserRouter>
        <Login setAuthUser={vi.fn()} />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Enter 'user', 'seller1', or 'seller2'");
    fireEvent.change(input, { target: { value: 'user' } });
    
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    
    expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
  });
});
