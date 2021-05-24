import React from 'react'
import { Link } from 'react-router-dom'

// import lostLakeImg from '../../assets/images/lost-lake.jpg'
import albumArt from '../../assets/images/FERALSUITSart.png'

import './Home.scss'

const Home:React.FC = () => {
  return (
    <div className="album-announcement">
      <Link to="/music">
        <img
          className="big-album-art"
          src={albumArt}
          alt="Album art for the forthcoming Feral Suits record"
        />
      </Link>
      <span>
        Feral Suits' debut record <b>"Drown the Garden"</b> is out
      </span>
      <span className="cta-text">
        listen to it{' '}
        <a href="https://album.link/i/1556008426" target="_blank" rel="noreferrer">
          anywhere
        </a>
      </span>
    </div>
  )
}

export default Home