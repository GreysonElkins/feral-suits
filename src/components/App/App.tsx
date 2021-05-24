import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import BandLinks from '../../components/BandLinks/BandLinks'
import allRoutes from '../../routes'
import './App.scss'

const App: React.FC = () => {
  const mapRoutes = (): React.ReactNode[] => {
    return allRoutes.map((route, i) => (
      <Route key={`route-${i}`} exact path={route.path} component={route.component} />
    ))
  }

  return (
    <div itemScope itemType="http://schema.org/MusicGroup">
      <div className="App">
        <Header />
        <Switch>{mapRoutes()}</Switch>
        <div className="foot">
          <BandLinks
            requestedLinkItems={[
              'Spotify',
              'Apple Music',
              'BandCamp',
              'SoundCloud',
              'Instagram',
              'Facebook',
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default App
