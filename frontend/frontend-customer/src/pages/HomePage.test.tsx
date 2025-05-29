import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders cake gallery heading', () => {
    render(<HomePage />);
    expect(screen.getByText(/Tort/)).toBeInTheDocument(); // checks for any cake alt text
  });
});
