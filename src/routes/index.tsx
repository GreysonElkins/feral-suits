import aboutRoute from './about'
import adminRoute from './admin'
import eventsRoute from './events'
import homeRoute from './home'
import musicRoute from './music'

export type route = {
  path: string
  public: boolean
  component: React.FC
}

const allRoutes = Object.assign(aboutRoute, adminRoute, eventsRoute, homeRoute, musicRoute)

export default allRoutes