import aboutRoute from './contact'
import adminRoute from './admin'
import eventsRoute from './events'
import homeRoute from './home'
import musicRoute from './music'

export type route = {
  path: string
  visible: boolean
  component: React.FC
}

const allRoutes:route[] =  [musicRoute, eventsRoute, aboutRoute, adminRoute, homeRoute]

export default allRoutes