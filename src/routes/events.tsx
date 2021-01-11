import Events from '../components/Events/Events'
import { route } from './index'

const eventsRoute: route = {
  path: "/events",
  public: true,
  component: Events
}

export default eventsRoute