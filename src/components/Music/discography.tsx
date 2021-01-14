import traipseArt from '../../assets/images/traipse.jpg'
import spokaneArt from '../../assets/images/spokane.jpg'

import { 
  traipseLyrics, 
  firstCar, 
  spokaneLyrics, 
  funk, 
  soft, 
  nextToMe, 
  light, 
  daybreaker, 
  hung, 
  anymore, 
  lavender 
} from './lyrics'

export class Track { 
  name: string
  duration: number
  lyrics: string[]
  trackNumber: number
  feature?: string[] | undefined

  constructor(
    name:string,
    trackNumber: number,
    duration: number,
  ) {
    this.name = name
    this.trackNumber = trackNumber
    this.duration = duration
    this.lyrics = []
    this.feature = undefined
  }

  addLyrics = (lyrics:string[]) => {
    this.lyrics = lyrics
  }

  printDuration = () => {
    return `${Math.floor(this.duration / 60)}:${this.duration % 60}`
  }
}

export class Album {
  name: string
  releaseDate: string 
  streamEmbed: React.ReactNode
  art: string | undefined
  tracks: Track[]
  type:string
  listenLink:string

  constructor(
    name:string, 
    releaseDate:string, 
    streamEmbed:React.ReactNode | undefined, 
    art:string | undefined,
    type:string,
    listenLink:string
    ) {
      this.name = name 
      this.releaseDate = releaseDate
      this.art = art
      this.tracks = []
      this.type = type
      this.streamEmbed = streamEmbed 
      this.listenLink = listenLink
    }

  addTrack = (track:Track) => {
    this.tracks.push(track)
  }

  addTracks = (tracks:Track[]) => {
    this.tracks = this.tracks.concat(tracks)
  }

  printDuration = ():string => {
    const inSeconds = this.tracks.reduce((totalTime, track):number => {
      totalTime += track.duration
      return totalTime
    }, 0) 

    return `${Math.floor(inSeconds / 60)}:${inSeconds % 60}`
  }
}

class Discography {
  albums: Album[]
  constructor() {
    this.albums = []
  }

  addAlbum = (album:Album) => {
    this.albums.push(album)
  }
}

const feralAlbums = new Discography() 

const traipseOfYouth = new Track("Traipse of Youth", 0, 248) 
traipseOfYouth.addLyrics(traipseLyrics)

const traipseSingle = new Album(
  "Traipse of Youth", 
  "July 20 2018", 
  <iframe 
    title="Traipse@bandcamp"
    style={{ border: 0, width: "100%", height: "120px" }}
    src="https://bandcamp.com/EmbeddedPlayer/track=1173907805/size=large/bgcol=333333/linkcol=e99708/tracklist=false/artwork=none/transparent=true/" 
    seamless
  >
    <a href="https://feralsuits.bandcamp.com/track/traipse-of-youth">
      Traipse of Youth by Feral Suits
    </a>
  </iframe>,
  traipseArt,
  "single",
  'https://feralsuits.bandcamp.com/track/traipse-of-youth'
  )

traipseSingle.addTrack(traipseOfYouth)

const spokane = new Track("Spokane & Poughkeepsie", 0, 168)
spokane.addLyrics(spokaneLyrics)
const spokaneSingle = new Album(
  "Spokane & Poughkeepsie", 
  "January 20, 2020", 
  <iframe 
    title="spokane@bandcamp"
    style={{ border: 0, width: "100%", height: "120px" }}
    src="https://bandcamp.com/EmbeddedPlayer/track=806203346/size=large/bgcol=333333/linkcol=e99708/tracklist=false/artwork=none/transparent=true/" 
    seamless
  >
    <a href="https://feralsuits.bandcamp.com/track/spokane-poughkeepsie">
      Spokane &amp; Poughkeepsie by Feral Suits
    </a>
  </iframe>,
  spokaneArt,
  "single",
  'https://feralsuits.bandcamp.com/track/spokane-poughkeepsie'
  ) 
  
spokaneSingle.addTrack(spokane)



const trackOne = new Track("My First Car", 1, 240)
const trackTwo = spokane
trackTwo.trackNumber = 2
const trackThree = new Track("From a Funk", 3, 210)
const trackFour = new Track("Soft Spot", 4, 350)
const trackFive = new Track("Next To Me (Homely)", 5, 329)
const trackSix = new Track("Light", 6, 258)
const trackSeven = new Track("Daybreaker", 7, 267)
const trackEight = new Track("Hung by the Hook", 8, 199)
const trackNine = new Track("Anymore", 9, 384)
const trackTen = new Track("Lavender Rabbits", 10, 314)

trackOne.addLyrics(firstCar)
trackThree.addLyrics(funk)
trackFour.addLyrics(soft)
trackFour.feature = ['Jamie Nagode', 'David Bernot']
trackFive.addLyrics(nextToMe)
trackSix.addLyrics(light)
trackSeven.addLyrics(daybreaker)
trackEight.addLyrics(hung)
trackNine.addLyrics(anymore)
trackTen.addLyrics(lavender)

const LPone = new Album("TBD", "TBA", undefined, undefined, "record", '')

LPone.addTracks([trackOne, trackTwo, trackThree, trackFour, trackFive, trackSix, trackSeven, trackEight, trackNine, trackTen])

feralAlbums.addAlbum(LPone)
feralAlbums.addAlbum(spokaneSingle)
feralAlbums.addAlbum(traipseSingle)

export default feralAlbums