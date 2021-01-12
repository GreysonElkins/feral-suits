import React from 'react'

import linkInfo from './linkInfo'
import './BandLinks.scss'

export type link = {
  name: string
  icon: string
  title: string
  type: string 
  link: string
}

type linkProps = {
  requestedLinkItems?: Array<string>
  providedLinkItems?: link[]
}

const BandLinks:React.FC<linkProps> = ({ requestedLinkItems, providedLinkItems }) => {

  const filterLinksByType = (type:string, links:link[]):link[] => {
    return links.filter(link => link.type === type)
  }

  const createIcon = ({name, link, icon, title, type}:link) => {
    return (
      <a 
        href={link} 
        title={title} 
        key={`${name}-link`}
      >
        <img 
          className="external-icon"
          src={icon} 
          alt={`${name} icon`} 
          key={`${name}-icon`}
        />
      </a>
    )
  }

  const createMultipleIcons = (links:link[]) => {
    const icons = links.map(link => createIcon(link))
    return <div>{icons}</div>
  }

  const findDefinedLinks = ():link[] => {
    return linkInfo.filter((link:link) => requestedLinkItems!.includes(link.name))
  }

  const createDefaultIcons = ():React.ReactNode => {
    const socialLinks = filterLinksByType('social', linkInfo)
    const mediaLinks = filterLinksByType('media', linkInfo)
    return (
      <div>
        {createMultipleIcons(socialLinks)}
        {createMultipleIcons(mediaLinks)}
      </div>
    )
  }

  const createIcons = ():React.ReactNode => {
    if (requestedLinkItems) {
      const links = findDefinedLinks()
      return createMultipleIcons(links)
    } else if (providedLinkItems) {
      return createMultipleIcons(providedLinkItems)
    } else {
      return createDefaultIcons()
    }
  }
    
  return (
    <div>
      {createIcons()}
    </div>
  )
}

export default BandLinks