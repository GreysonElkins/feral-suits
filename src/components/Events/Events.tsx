import React from 'react'
import { format } from 'date-fns'

import shows, { Event, Performer } from './eventData'
import './Events.scss'

const Events:React.FC = () => {

  const createEventCard = (show:Event) => (
    <div className={`event-card ${show.eventType === "cancelled" && "cancelled"}`} itemScope itemType="https://schema.org/MusicEvent">
      <h4 className="event-line-one">{show.title}
        {show.eventType === "cancelled" && 
          <>
            <meta itemProp="eventStatus" content="https://schema.org/EventCancelled" />
            <span style={{color:"#A81118"}}> Cancelled</span>
          </>
        }
      </h4>
      <div className="event-body">
        <div className="event-info">
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
          {show.performers.length > 0 && 
            <h6 className="performers-list">with: {getPerformerList(show.performers)}</h6>
          }
          <div className="event-text">
            <div className="start-date">
              <meta itemProp="startDate" content={`${format(show.date, 'yyyy-MM-dd')}T${show.startTime}`} />
              {format(show.date, 'MMMM dd, yyyy')}
            </div>
            <div>{printTimeRegular(show.startTime)} - {printTimeRegular(show.endTime)}</div>
            <div className="event-description">{show.about}</div>
            <div>
              {show.ticketLink &&
                <a href={show.ticketLink}>
                  <button 
                    itemProp="offers" 
                    itemScope 
                    itemType="https://schema.org/Offer"
                    className="ticket-link"
                  >
                    <meta itemProp="price" content={show.price} />
                    Tickets
                  </button>
                </a>
              }
              {show.eventLink &&
                <a href={show.eventLink}>
                  <button 
                    className="event-link" 
                  >
                    Event
                  </button>
                </a>
              }
            </div>
          </div>
        </div>
        <img 
            src={show.image} 
            alt={`show flier for ${show.title}`}
            className="event-image"
          />
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
                , {performer.name}
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

  const printTimeRegular = (time:string) => {
    const theHour = parseInt(time.slice(0, 2))
    
    if (theHour === 12) {
      return `${time} PM`
    } else if (theHour > 12) {
      return `${theHour - 12}${time.slice(2, 5)} PM`
    } else {
      return `${time} AM`
    }

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