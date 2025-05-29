import { render, screen } from '@testing-library/react';
import GalleryPage from './GalleryPage';

describe('GalleryPage', () => {
  it('renders heading and info', () => {
    render(<GalleryPage />);
    expect(screen.getByText('Galeria tortów')).toBeInTheDocument();
    expect(screen.getByText(/Zdjęcia przykładowych tortów/)).toBeInTheDocument();
  });
});
