import traipseArt from '../../assets/images/traipse.jpg'
import spokaneArt from '../../assets/images/spokane.jpg'

import { traipseLyrics, spokaneLyrics } from './lyrics'

class Track { 
  name: string
  duration: number
  lyrics: string[]
  trackNumber: number

  constructor(
    name:string,
    trackNumber: number,
    duration: number,
  ) {
    this.name = name
    this.trackNumber = trackNumber
    this.duration = duration
    this.lyrics = []
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
  art: string
  tracks: Track[]
  type:string

  constructor(
    name:string, 
    releaseDate:string, 
    streamEmbed:React.ReactNode | undefined, 
    art:string,
    type:string
    ) {
      this.name = name 
      this.releaseDate = releaseDate
      this.art = art
      this.tracks = []
      this.type = type
      this.streamEmbed = streamEmbed 
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
   )

  traipseSingle.addTrack(traipseOfYouth)

  const spokane = new Track("Spokane & Poughkeepsie", 0, 168)
  spokane.addLyrics(spokaneLyrics)
  const spokaneSingle = new Album(
    "Spokane & Poughkeepsie", 
    "January 20, 2020", 
    <iframe 
      style={{ border: 0, width: "100%", height: "120px" }}
      src="https://bandcamp.com/EmbeddedPlayer/track=806203346/size=large/bgcol=333333/linkcol=e99708/tracklist=false/artwork=none/transparent=true/" 
      seamless
    >
      <a href="https://feralsuits.bandcamp.com/track/spokane-poughkeepsie">
        Spokane &amp; Poughkeepsie by Feral Suits
      </a>
    </iframe>,
    spokaneArt,
    "single"
    ) 
    
  spokaneSingle.addTrack(spokane)

  feralAlbums.addAlbum(spokaneSingle)
  feralAlbums.addAlbum(traipseSingle)

export default feralAlbums