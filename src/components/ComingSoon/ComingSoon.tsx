import React from 'react'
import BandLinks from '../BandLinks/BandLinks'

import lostLake from '../../assets/images/lost-lake.jpg'
import './ComingSoon.scss'

const ComingSoon:React.FC = () => {
  return (
    <div className="ComingSoon">
      <div className="banner">
          <h2 className="coming-soon-text">
            Coming Soon
          </h2>
      </div>
      <div className="foot-links">
        <BandLinks />
      </div>
      <div className="body-image"></div>
    </div>

  )
}

export default ComingSoon