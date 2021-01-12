import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import allRoutes from '../../routes'
import './App.scss';

const App:React.FC = () => {

  const mapRoutes = ():React.ReactNode[] => {
    return allRoutes.map((route, i) => (
      <Route 
        key={`route-${i}`} 
        exact path={route.path} 
        component={route.component}
      />
    ))
  }

  return (
    <div itemScope itemType="http://schema.org/MusicGroup">
      <div className="App">
        <Header hiddenNav={true}/>
        <Switch>
          {mapRoutes()}
        </Switch>
      </div>
    </div>
  );
}

export default App;
