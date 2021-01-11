import Home from '../components/Home/Home'
import ComingSoon from '../components/ComingSoon/ComingSoon'
import { route } from './index'

const homeRoute:route = {
  path: '/',
  public: true,
  component: ComingSoon
}

export default homeRoute