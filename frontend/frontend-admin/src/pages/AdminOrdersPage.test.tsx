import { render, screen } from '@testing-library/react';
import AdminOrdersPage from './AdminOrdersPage';

describe('AdminOrdersPage', () => {
  it('renders heading and info', () => {
    render(<AdminOrdersPage />);
    expect(screen.getByText('Zamówienia')).toBeInTheDocument();
    expect(screen.getByText(/Lista wszystkich zamówień/)).toBeInTheDocument();
  });
});
