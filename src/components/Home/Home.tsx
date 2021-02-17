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
      Feral Suits' debut record <b>"Drown the Garden"</b> comes out March 19, 2021
      </span>
      follow us on your favorite platform and keep an eye out for it
    </div>
  )
}

export default Home