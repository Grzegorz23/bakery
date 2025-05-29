import { render, screen } from '@testing-library/react';
import OrdersListPage from './OrdersListPage';

describe('OrdersListPage', () => {
  it('renders orders list heading', () => {
    render(<OrdersListPage />);
    expect(screen.getByText('Zamów Tort')).toBeInTheDocument();
  });
});
