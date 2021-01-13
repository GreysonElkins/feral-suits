import { ReactNode } from "react"

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

  }
}

// const traipseOfYouth = new Track("Traipse of Youth", "") 

class Album {
  name: string
  releaseDate: string 
  streamEmbed: React.ReactNode
  art: string
  tracks: Track[]
  type:string

  constructor(
    name:string, 
    releaseDate:string, 
    streamEmbed:React.ReactNode, 
    art:string,
    type:string
    ) {
      this.name = name 
      this.releaseDate = releaseDate
      this.streamEmbed = streamEmbed 
      this.art = art
      this.tracks = []
      this.type = type
    }

    addTrack = (track:Track) => {
      this.tracks.push(track)
    }

    addTracks = (tracks:Track[]) => {
      this.tracks = this.tracks.concat(tracks)
    }
}



const discography:Album[] = [

]

export {}