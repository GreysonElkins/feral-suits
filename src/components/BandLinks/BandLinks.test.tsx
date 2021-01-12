import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import BandLinks, { link } from './BandLinks'
import linkInfo from './linkInfo'

const findMatchingLink = (name:string, availableLinks:link[]):link => {
  return availableLinks.filter(link => link.name === name)[0]
}

const turnListIntoTable = (list:string[]):string[][] => {
  return list.map(item => [item])
}

let iconList = [
  'Spotify', 
  'Apple Music', 
  'Instagram', 
  'Facebook', 
  'SoundCloud', 
  'BandCamp', 
  'Email'
]
let requestedLinkItems = ['Spotify', 'Apple Music', 'Instagram']
let providedLinkItems = [{
  name: 'Next to Me (Homely)',
  icon: './favicon.svg',
  title: 'This is a song',
  type: 'media',
  link: 'http://www.google.com'
}, { 
  name: 'Spokane',
  icon: './favicon.svg',
  title: 'This is a song',
  type: 'media',
  link: 'http://www.typescriptlang.org'
}]


describe('BandLinks', () => {
  
  describe('Default BandLinks', () => {
    
    it('should render 9 links by default', () => {
      render(<BandLinks />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(7)
    })
    
    test.each(turnListIntoTable(iconList))(
      `A %s should be in the document`, 
      (icon) => {
        render(<BandLinks />)
        const foundIcon = screen.getByAltText(`${icon} icon`)
        expect(foundIcon).toBeInTheDocument()
      }
    )
      
    it(`should render requestedLinkItems instead 
    of provided ones if both are provided`, () => {
      render(
        <BandLinks 
          requestedLinkItems={requestedLinkItems}
          providedLinkItems={providedLinkItems}
        />
      )
      const foundLinks = screen.getAllByRole('link')
      expect(foundLinks).toHaveLength(3)
    })

    test.skip.each(turnListIntoTable(iconList))(
      `%s icon should redirect to it's website`, 
      (icon) => {
        render(<BandLinks />)
        const foundIcon = screen.getByAltText(`${icon} icon`)
        const expectedLink = findMatchingLink(icon, linkInfo).link
        fireEvent.click(foundIcon)
        expect(window.location.href).toBe(expectedLink)
      }
    )
  })

  describe('Requested BandLinks', () => {
    
    beforeEach(() => {
      render(<BandLinks requestedLinkItems={requestedLinkItems}/>)
    })

    it('should only render requested links (3) if the links name is provided', () => {
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(3)
    })

    test.each(requestedLinkItems.map(item => [item]))(
      'A %s icon should be in the document',
      (icon) => {
        const foundIcon = screen.getByAltText(`${icon} icon`)
        expect(foundIcon).toBeInTheDocument()
      }
    )

    it('should not render unrequested icons', () => {
      const missingLink = screen.queryByAltText('Email icon')
      expect(missingLink).not.toBeInTheDocument()
    })

  })

  describe('Provided BandLinks', () => {
    beforeEach(() => {
      render(<BandLinks providedLinkItems={providedLinkItems}/>)
    })

      it('should only render provided links if those links are provided (2)', () => {
        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(2)
      })

      test.each(providedLinkItems.map(item => [item]))(
        'The links should have individual icons', 
        (icon) => {
          const foundIcon = screen.getByAltText(`${icon.name} icon`)
          expect(foundIcon).toBeInTheDocument()
        }
      )

    it('should not render icons that were not provided', () => {
      const missingLink = screen.queryByAltText('Email icon')
      expect(missingLink).not.toBeInTheDocument()
    })
  })

})