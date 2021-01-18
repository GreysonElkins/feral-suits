import React from 'react'

import lostLakeImg from '../../assets/images/lost-lake.jpg'

import './Home.scss'

const Home:React.FC = () => {
  return (
    <div className="banner-container">
      <img 
        src={lostLakeImg} 
        alt="Feral Suits performing at Lost Lake, Denver"
      />
    </div>
  )
}

export default Home