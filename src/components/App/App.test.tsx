import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import App from './App';

test('renders coming soon component', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const comingSoon = screen.getByText(/Coming Soon/i);
  expect(comingSoon).toBeInTheDocument();
});
