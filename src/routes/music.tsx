import Music from '../components/Music/Music'
import { route } from './index'

const musicRoute:route = {
  path: '/music',
  public: true,
  component: Music 
}

export default musicRoute