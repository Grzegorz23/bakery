import { render, screen } from '@testing-library/react';
import AddCakeModal from './AddCakeModal';

describe('AddCakeModal', () => {
  it('renders modal with form', () => {
    render(<AddCakeModal />);
    expect(screen.getByText('Dodaj Tort')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nazwa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cena')).toBeInTheDocument();
    expect(screen.getByText('Dodaj')).toBeInTheDocument();
    expect(screen.getByText('Anuluj')).toBeInTheDocument();
  });
});
