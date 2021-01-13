import React from 'react'
import BandLinks from '../BandLinks/BandLinks'

import './ComingSoon.scss'

const ComingSoon:React.FC = () => {
  return (
    <div className="ComingSoon">
      <div className="banner">
          <h2 className="coming-soon-text">
            Website coming Soon
          </h2>
          <p>In the meantime, find us on your favorite platforms:</p>
      </div>
      <div className="foot-links">
        <BandLinks />
      </div>
      <div className="body-image"></div>
    </div>

  )
}

export default ComingSoon