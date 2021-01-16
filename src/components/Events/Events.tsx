import React from 'react'

import shows, { Event, Performer } from './eventData'

const Events:React.FC = () => {

  const createEventCard = (show:Event) => (
    <div className="event-card" itemScope itemType="https://schema.org/MusicEvent">
      <h4 className="event-line-one">{show.title}</h4>
      <h5 
        className="event-line-two"
        itemProp="location" 
        itemScope 
        itemType="https://schema.org/MusicVenue"
      >
        {show.locationAddress && 
          <meta itemProp="address" content={`${show.locationAddress}, ${show.cityState}`} />
        }
        Presented by: <span style={{fontWeight: "bold"}} itemProp="name">{show.location}</span>
      </h5>
      <div className="event-body">
        <img 
          src={show.image} 
          alt={`show flier for ${show.title}`}
          className="event-image"
        />
        <div className="event-info">
          {show.performers.length > 0 && 
            <h6>with: {getPerformerList(show.performers)}</h6>
          }
          <span itemProp="startDate">{console.log('The show dates and times need to be converted to ISO 8601 date format')}{show.date}</span>
          <span>{show.startTime}-{show.endTime}</span>
          <span>{show.about}</span>
          <button itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content={show.price} />
            Tickets
          </button>
          <button>Event</button>
        </div>
      </div>
    </div>
  )

  const getPerformerList = (performers:Performer[]) => {
    const performersList = performers.map(performer => {
      if (performer.link) {
        return (
          <span itemProp="performer" itemScope itemType="https://schema.org/MusicGroup">
            <a itemProp="sameAs" href={performer.link}>
              <span itemProp="name">
                {performer.name}
              </span>
            </a>
          </span>
        ) 
      } else {
        return (
          <span itemProp="performer" itemScope itemType="https://schema.org/MusicGroup">
            <span itemProp="name">{performer.name}</span>
          </span>
        )
      }
    })

    return <span>
      <span itemProp="performer" itemScope itemType="https://schema.org/MusicGroup">
        Feral Suits
      </span>
      {performersList}
    </span>
  }

  const showEvents = ():React.ReactNode[] => {
    return shows.map(show => createEventCard(show))
  }

  return (
    <>
     {showEvents()}
    </>
  )
}

export default Events