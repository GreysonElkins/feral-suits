import React, {useReducer, useState, useEffect} from 'react'

import { albumViewUpdate, albumView, stringKeyOptions } from './definitions'
import feralAlbums, { Album, Track } from './discography'

import './Music.scss'

const changeAlbumInfoView = (state: object, albumViewUpdate:albumViewUpdate):stringKeyOptions => {
  return {
    ...state,
    [albumViewUpdate.type]: albumViewUpdate.value || "TRACKS" 
  }
}

const Music:React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [albumInfoView, dispatchAlbumInfoView] = useReducer(changeAlbumInfoView, {})
  const [displayLyrics, setDisplayLyrics] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    feralAlbums.albums.forEach((album:Album) => dispatchAlbumInfoView({type: album.name}))
    setIsLoading(false)
  }, [isLoading])

  const createAlbumCards = ():React.ReactNode[] => {
    return feralAlbums.albums.map((album) => {
      return (
        <div className="album" itemScope itemType="https://schema.org/MusicAlbum">
          <meta content={album.tracks.length.toString()}itemProp="numTracks" />
          <meta content="Rock" itemProp="genre" />
          <meta content={album.listenLink} itemProp="url" />
          <meta
            content="Feral Suits"
            itemProp="byArtist" 
            itemScope itemType="https://schema.org/MusicGroup" />
            <div className="mobile-art">
              <img 
                itemProp="image"
                className="album-art-mobile" 
                src={album.art}
                alt={`Album art for ${album.name}`}
              />
            </div>
          <div className="nav-and-title">
            <div className="title-section">
              <h3 itemProp="name">{album.name}</h3>
              <span className="album-length">
                | {album.tracks.length} song{album.tracks.length > 1 && 's'} | {album.printDuration()}
              </span>
            </div>
            <div className="info-select">
              <button
                className={selectInfoButton(album.name, albumView.Tracks)}
                onClick={(event)=> {
                  event.preventDefault()
                  dispatchAlbumInfoView({type: album.name, value: albumView.Tracks})
                } 
                }
              >
                Tracks</button>
              <button
                className={selectInfoButton(album.name, albumView.Stream)}
                onClick={(event)=> {
                  event.preventDefault()
                  dispatchAlbumInfoView({type: album.name, value: albumView.Stream})
                } 
                }
              >
                Stream
              </button>
            </div>
          </div>
          <div className="more-info">
            <img 
              itemProp="image"
              src={album.art} 
              alt={`Album art for ${album.name}`} 
              className="album-art"
              />
              {createMoreInfoSection(album)}
          </div>
        </div>
      )
    })
  }

  const createMoreInfoSection = (album:Album) => {
    if (albumInfoView[album.name] === albumView.Tracks) {
      return createTrackList(album) 
    } else {
      return (
        <div className="streaming-embed">
          {album.streamEmbed ? album.streamEmbed : notifyUnavailable()}
        </div>
      )
    }
  }

  const notifyUnavailable = ():React.ReactNode => {
    return (
      <span>
        This hasn't been released yet - follow us on <a 
          className="intentional-link"
          href="https://open.spotify.com/artist/3NS8aEjC3lH0xDynDB7zZK?si=oEbtbHcdTbiPXUwnWUzqAw">
            Spotify
        </a> so you know when it is!
      </span>
    )
  }

  const createTrackList = (album:Album) => {
    const tracks = album.tracks.map((track) => {
      return (
        <>
          <div className="track-row" itemScope itemType="https://schema.org/MusicRecording">
            <meta content={`PT${Math.floor(track.duration / 60)}M${track.duration % 60}S`} />
            <meta content={album.name} itemType="inAlbum" />
            <div style={{textAlign: "left"}}>
              {album.type !== 'single' && <span style={{opacity: ".4"}}>{track.trackNumber} - </span>}
                <span itemProp="name">
                  <span className="track-name">{track.name}</span> {createContributor(track)}
                </span>
            </div>
            <button
              className="info-button lyric-button"
              onClick={() => setDisplayLyrics(track.lyrics)}
            >
              lyrics
            </button>
          </div>
          <hr style={{width: "100%"}}/> 
        </>
      )
    })

    return <div className="track-list">{tracks}</div>
  }

  const printLyrics = ():React.ReactNode => {
    let lyricSheet: React.ReactNode | undefined;
    if(Array.isArray(displayLyrics)) {
      lyricSheet = displayLyrics.reduce((lyrics:React.ReactNode[], line):React.ReactNode[] => {
        if (line === " ") {
          lyrics.push(<><br /></>)
        } else {
          lyrics.push(<>{line}<br /></>)
        }
        return lyrics
      }, [])
    }

    return <p>{lyricSheet}</p>;
  }

  const showLyrics = ():React.ReactNode => {
    return (
      <>
        <div className="black-out"></div>
        <div className="lyric-container" onClick={() => {setDisplayLyrics(undefined)}}>
          <div className="sheet-and-button">
            <div className="lyric-sheet" onClick={() => {}}>
              {printLyrics()}
            </div>
            <button className="close-button">
              close
            </button>
          </div>
        </div>
      </>
    )
  }

  const selectInfoButton = (albumName:string, type:string):string => {
    if (albumInfoView[albumName] === type) {
      return 'selected-info-button'
    } else {
      return 'info-button'
    }
  }
  
  const createContributor = (track:Track) => {
    let list;
    if (track.feature) {
      list = track.feature.reduce((features:React.ReactNode[], feature):React.ReactNode[] => {
        features.push(
          <span itemType="https://schema.org/MusicRecording">
            <meta content={track.name} itemProp="name" />
            <span itemProp="contributor" itemType="https://schema.org/MusicGroup" className="contributor">: {feature}</span>
          </span>
        )
        return features
      }, [])
      return <span>| features{list}</span>
    }
  }

  return (
    <div className="discography">
      {createAlbumCards()}
      {displayLyrics && 
        showLyrics()
      }
    </div>
  )
}

export default Music