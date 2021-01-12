import React from 'react'
import BandLinks from '../BandLinks/BandLinks'

import './ComingSoon.scss'

const ComingSoon:React.FC = () => {
  return (
    <div className="ComingSoon">
      <h2 className="coming-soon-text">Coming Soon</h2>
      <div className="foot-links">
        <BandLinks />
      </div>
    </div>

  )
}

export default ComingSoon