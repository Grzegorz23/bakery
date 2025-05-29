import { render, screen } from '@testing-library/react';
import OrderPage from './OrderPage';

describe('OrderPage', () => {
  it('renders order form', () => {
    render(<OrderPage />);
    expect(screen.getByPlaceholderText('Imię')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nazwisko')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Smak')).toBeInTheDocument();
    expect(screen.getByText('Zamów')).toBeInTheDocument();
  });
});
