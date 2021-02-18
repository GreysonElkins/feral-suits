import React, { useState } from 'react'
import { format, compareAsc, isAfter, startOfToday, isBefore } from 'date-fns'

import shows, { Event, Performer } from './eventData'
import './Events.scss'

enum eventView {
  all = 'All',
  previous = 'Previous',
  upcoming = 'Upcoming'
}

const Events:React.FC = () => {
  const [eventViewRange, setEventViewRange] = useState<eventView>(eventView.upcoming)

  const populateExtraButtons = (show:Event):React.ReactNode[] => {
    return show.moreButtons.map(button => {
      return (
        <a href={button.link} target="_blank" rel="noreferrer">
          <button 
            className="event-link extra-link" 
          >
            {button.title}
          </button>
        </a>
      )
    })
  }

  const createEventCard = (show:Event) => (
    <div 
      className={`event-card ${show.eventType === "cancelled" && "cancelled"}`} 
      itemScope itemType="https://schema.org/MusicEvent"
      key={format(show.date, 'yyyy-dd-MM')}
    >
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
                <a href={show.ticketLink} target="_blank" rel="noreferrer">
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
              {show.moreButtons.length > 0 &&
                populateExtraButtons(show)
              }
              {show.eventLink &&
                <a href={show.eventLink} target="_blank" rel="noreferrer">
                  <button 
                    className="event-link" 
                  >
                    Facebook Event
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
    const performersList = performers.map((performer, i) => {
      if (performer.link) {
        return (
          <span itemProp="performer" itemScope itemType="https://schema.org/MusicGroup" key={`performer-${performer.name}-${i}`}>
            , <a className="some-event-link" itemProp="sameAs" href={performer.link} target="_blank" rel="noreferrer">
              <span itemProp="name">
                {performer.name}
              </span>
            </a>
          </span>
        ) 
      } else {
        return (
          <span itemProp="performer" itemScope itemType="https://schema.org/MusicGroup" key={`performer-${performer.name}-${i}`}>
            <span itemProp="name">, {performer.name}</span>
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
    const sortedShows = sortEvents()
    const whichShows = determineWhichEvents(sortedShows)
    if (whichShows.length > 0) {
      return whichShows.map(show => createEventCard(show))
      // return []
    } else {
      return [
        <p className="no-event-message" key="no shows message">
          There aren't any upcoming shows right now. 
          <br /> 
          Follow us on <a className="some-event-link" href="https://www.facebook.com/feralsuits" target="_blank" rel="noreferrer">Facebook
          </a> to see when more are announced
          <br />
          Or check back later! 
        </p>]
    }
  }

  const sortEvents = ():Event[] => {
    return shows.sort((b, a) => compareAsc(a.date, b.date))
  }

  const determineWhichEvents = (sortedShows?: Event[]) => {
    const allShows = sortedShows ? sortedShows : shows
    if (eventViewRange === eventView.upcoming) {
      return allShows.filter(show => isAfter(show.date, startOfToday()))
    } else if (eventViewRange === eventView.previous) {
      return allShows.filter(show => isBefore(show.date, startOfToday()))
    } else {
      return allShows
    }
  }

  const showOtherEventFilterOptions = () => {
    const options = [eventView.all, eventView.upcoming, eventView.previous]
    const unselectedOptions = options.filter(option => option !== eventViewRange)
    return unselectedOptions.map(option => (
      <button
        key={`${option}-button`}
        className="event-page-changer"
        onClick={() => {
          setEventViewRange(option)
        }}
      >
        {option} Events
      </button>
    ))
  }

  return (
    <>
      <h2 className="current-event-range">{eventViewRange} Events</h2> 
      {showEvents()}
      {showOtherEventFilterOptions()}
    </>
  )
}

export default Events