import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserPortal from './UserPortal';

describe('UserPortal Component', () => {
  it('renders a welcome message for the user', async () => {
    // Mock the global fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<UserPortal authUser={{ name: 'Test Shopper' }} />);
    expect(screen.getByText('Welcome, Test Shopper')).toBeInTheDocument();
    
    // Cleanup
    global.fetch.mockRestore();
  });
});
