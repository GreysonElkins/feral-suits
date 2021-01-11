import React from 'react'
import { Route, Switch } from 'react-router-dom'

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
    <div className="App">
      <Switch>
        {mapRoutes()}
      </Switch>
    </div>
  );
}

export default App;
