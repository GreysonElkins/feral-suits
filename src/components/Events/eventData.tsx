import circle from '../../assets/images/show-fliers/circle.jpg'
import dutches from '../../assets/images/show-fliers/dutches.jpg'
import gringo from '../../assets/images/show-fliers/gringo.jpg'
import tempDazzle from '../../assets/images/show-fliers/temp-dazzle.jpg'

export class Performer {
  name: string
  link?: string
  members?: string[]

  constructor(name:string, link?:string, members?: string[]) {
    this.name = name
    this.link = link
    this.members = members
  }
}

export class Event {
  title: string
  location: string
  image: string
  date: string
  startTime: string
  endTime: string
  about: string | string[]
  performers: Performer[]
  eventType: string
  eventLink?: string | undefined
  ticketLink?: string | undefined
  locationAddress?: string
  cityState?: string
  price?: string

  constructor (
    title: string,
    location: string,
    image: string,
    date: string,
    startTime: string,
    endTime: string,
    about: string | string[],
    performers: Performer[],
    eventType: string,
    eventLink: string | undefined,
    ticketLink?: string | undefined,
    locationAddress?: string,
    cityState?: string,
    price?: string
    ) {
    this.title = title
    this.location = location
    this.image = image
    this.date = date
    this.startTime = startTime
    this.endTime = endTime
    this.about = about
    this.performers = performers
    this.eventType = eventType
    this.eventLink = eventLink
    this.ticketLink = ticketLink
    this.locationAddress = locationAddress
    this.cityState = cityState
    this.price = price
  }
}

const milkOfMag = new Performer('Milk of Magnesia', 'https://www.facebook.com/milkofmagnesiaband/')
const somedayBest = new Performer('Someday Best')
const motelFrunz = new Performer('Motel Frunz', 'https://www.facebook.com/motelfrunz/')
const blanchard = new Performer('Blanchard', 'https://dylanblanchard.bandcamp.com/')

const definitelyMaybe = new Performer('Definitely Maybe','https://www.facebook.com/definitelymaybeband/')
const lunchDuchess = new Performer('Lunch Duchess', 'https://www.facebook.com/LunchDuchess/')
const specificOcean = new Performer('Specific Ocean', 'https://www.facebook.com/specificoceanband')

const gringoStar = new Performer('Gringo Star', 'https://www.facebook.com/gringostarmusic/')
const turvyOrgan = new Performer('Turvey Organ', 'https://www.facebook.com/turvyorgan/')

const seventhCircleMarch = new Event(
  'Feral Suits @ Seventh Circle',
  'Seventh Circle Music Collective',
  circle,
  '03/28/2020',
  '7 PM',
  '11PM',
  'Feral Suits is celebrating their name change with some new songs, live at Seventh Circle, with a big cast of dear friends.',
  [milkOfMag, somedayBest, motelFrunz, blanchard],
  'cancelled',
  'https://www.facebook.com/events/585802978640122/',
  'https://7thcirclemusiccollective.org/event/milk-of-magnesia-someday-best-blanchard-feral-suits-motel-frunz-7c/',
  '2935 W 7th Ave',
  'Denver, CO',
  '$7 to $10 suggested donation'
)

const lunchDuchSyntax = new Event(
  'Feral Suits with Lunch Dutchess',
  'Syntax Physic Opera',
  dutches,
  '10/28/2018',
  '8 PM',
  '11:59PM',
  "Lunch Duchess (MN) returns to Denver after 2 years, bringing their angular brand of half-silly, half-cathartic grunge pop with them. With one moody new single from their upcoming album already out and another forthcoming, they're a band to keep an eye on!",
  [lunchDuchess, definitelyMaybe, specificOcean],
  'venue',
  'https://www.facebook.com/events/315728939229549/',
  'https://physicopera.com/calendar.html',
  '554 S Broadway',
  'Denver, CO',
  'Free'
)

const lostLakeGringo = new Event(
  "Girngo Star's Album Release Party", 
  "Lost Lake and Colorado Public Radio's Open Air",
  gringo,
  '09/25/2018',
  '7 PM',
  '11:59 PM',
  "Feral Suits is stoked to be supporting Gringo Start on their 2018 tour-stop in Denver CO - come around for some Tuesday night bangers.",
  [gringoStar, turvyOrgan],
  'venue',
  'facebook.com/events/1450341381734375/',
  'https://www.lost-lake.com/',
  '3602 E Colfax Ave',
  'Denver, CO',
  '$10'
)

const dazzlAlbumRelease = new Event(
  "Feral Suits Album Release Party",
  "Dazzle Denver",
  tempDazzle,
  '03/01/2020',
  '7 PM',
  '8 PM',
  "In celebration of their first album, Feral Suits will be live-streaming a perfromance from one of the most emminent Jazz Clubs in the nation, Dazzle Denver. Tune in from the comfort of your home for good vibes.",
  [],
  'virtual',
  // 'facebook.com',
  undefined,
  'https://dazzledenver.com/live-streams/',
  '1512 Curtis Street',
  'Denver, CO',
  'Free'
)

const shows = [dazzlAlbumRelease, lostLakeGringo, lunchDuchSyntax, seventhCircleMarch]

export default shows