import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders navigation links', () => {
    try {
      render(<App />);
    } catch (err) {
      console.error('Render error:', err);
      throw err;
    }
    expect(screen.getByText('🏠 Strona główna')).toBeInTheDocument();
    expect(screen.getByText('🖼️ Galeria')).toBeInTheDocument();
    expect(screen.getByText('📋 Zamów tort')).toBeInTheDocument();
    expect(screen.getByText('📋 Zobacz zamówienia')).toBeInTheDocument();
  });
});
