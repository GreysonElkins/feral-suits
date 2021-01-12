import React from 'react'
import BandLinks from '../BandLinks/BandLinks'

import './ComingSoon.scss'

const ComingSoon:React.FC = () => {
  return (
    <div className="ComingSoon">
      <h1>Coming Soon</h1>
      <div className="foot-links">
        <BandLinks />
      </div>
    </div>

  )
}

export default ComingSoon