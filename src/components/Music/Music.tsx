import React, {useReducer, useState, useEffect} from 'react'

import { albumViewUpdate, albumView, stringKeyOptions } from './definitions'
import feralAlbums, { Album } from './discography'

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
        <div className="album">
          <div className="nav-and-title">
            <h3>{album.name}</h3>
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
          <div className="track-row">
            <span>
              {track.name}
            </span>
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
          <div className="lyric-sheet" onClick={() => {}}>
            {printLyrics()}
          </div>
          <button className="close-button">
            close
          </button>
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