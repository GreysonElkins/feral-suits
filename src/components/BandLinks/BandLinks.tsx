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

const BandLinks:React.FC = () => {

  const filterLinksByType = (type:string, links:link[]):link[] => {
    return links.filter(link => link.type === type)
  }

  const createIcons = (type?:string):React.ReactNode => {
    const links = type ? filterLinksByType(type, linkInfo) : linkInfo
    const icons = links.map(({name, link, icon, title, type}, i) => (
      <a 
        href={link} 
        title={title} 
        key={`${type}-link-${i}`}
      >
        <img 
          className="media-icon"
          src={icon} 
          alt={`${name} icon`} 
          key={`${type}-icon-${i}`}
        />
      </a>
    ))
    return <div className="icon-set">{icons}</div>
  }

  return (
    <div>
      {createIcons("social")}
      {createIcons("media")}
    </div>
  )
}

export default BandLinks