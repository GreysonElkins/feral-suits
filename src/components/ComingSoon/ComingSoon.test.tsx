import { render, screen } from '@testing-library/react';
import ComingSoon from './ComingSoon';

describe('ComingSoon', () => {
  
  beforeEach(() => {
    render(<ComingSoon />)
  })

  it('Should display text "Coming Soon', () => {
    const text = screen.getByText('Coming Soon')
    expect(text).toBeInTheDocument()
  })

  it('Should render band links', () => {
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(7)
  })
})