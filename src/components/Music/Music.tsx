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

  useEffect(() => {
    feralAlbums.albums.forEach((album:Album) => dispatchAlbumInfoView({type: album.name}))
    setIsLoading(false)
  }, [isLoading])

  const createMoreInfoSection = (album:Album) => {
    if (albumInfoView[album.name] === albumView.Tracks) {
      return createTrackList(album) 
    } else {
      return album.streamEmbed
    }
  }

  const createTrackList = (album:Album) => {
    return album.tracks.map((track) => {
      return (
        <div className="track-row">
          <span>
            {track.name}
          </span>
          <span>
            {track.printDuration()}
          </span>
          <button
            onClick={() => console.log(track.lyrics)}
          >
            lyrics
          </button>
        </div>
      )
    })
  }

  const createAlbumCards = ():React.ReactNode[] => {
    return feralAlbums.albums.map((album) => {
      return (
        <div className="album">
          <div className="art-and-title">
            <h3>{album.name}</h3>
            <img 
              src={album.art} 
              alt={`Album art for ${album.name}`} 
              className="album-art"
              />
          </div>
          <div className="more-info">
            <div className="info-select">
              <button
                onClick={(event)=> {
                  event.preventDefault()
                  dispatchAlbumInfoView({type: album.name, value: albumView.Tracks})
                } 
                }
              >
                Tracks</button>
              <button
                onClick={(event)=> {
                  event.preventDefault()
                  dispatchAlbumInfoView({type: album.name, value: albumView.Stream})
                } 
                }
              >
                Stream
              </button>
            </div>
            <div>
              {createMoreInfoSection(album)}
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      {createAlbumCards()}
    </>
  )
}

export default Music