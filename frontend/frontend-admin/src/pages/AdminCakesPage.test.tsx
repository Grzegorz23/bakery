import { render, screen } from '@testing-library/react';
import AdminCakesPage from './AdminCakesPage';

describe('AdminCakesPage', () => {
  it('renders heading and info', () => {
    render(<AdminCakesPage />);
    expect(screen.getByText('Zarządzaj tortami')).toBeInTheDocument();
    expect(screen.getByText(/Lista, dodawanie i usuwanie tortów/)).toBeInTheDocument();
  });
});
