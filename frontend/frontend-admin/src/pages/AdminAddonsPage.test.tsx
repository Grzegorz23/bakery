import { render, screen } from '@testing-library/react';
import AdminAddonsPage from './AdminAddonsPage';

describe('AdminAddonsPage', () => {
  it('renders heading and info', () => {
    render(<AdminAddonsPage />);
    expect(screen.getByText('Zarządzaj dodatkami')).toBeInTheDocument();
    expect(screen.getByText(/Dodawanie i usuwanie dodatków/)).toBeInTheDocument();
  });
});
