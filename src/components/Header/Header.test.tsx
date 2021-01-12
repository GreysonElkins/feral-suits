import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Header from './Header'

describe('Temporary Header', () => {
  
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header hiddenNav={true} />)
      </MemoryRouter>
    )
  })

  it('should render the band name', () => {
    const name = screen.getByRole('heading', "Feral Suits")
    expect(name).toBeInTheDocument()
  })

  it('should render the band name as the only link', () => {
    const name = screen.getAllByRole('link')
    expect(name).toHaveLength(1)
  })
})

describe('Header With Nav', () => {
  
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />)
      </MemoryRouter>
    )
  })

  it('should render the band name', () => {
    const name = screen.getByRole('heading', "Feral Suits")
    expect(name).toBeInTheDocument()
  })

  it('should render 3 additional links to the band name', () => {
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })
})