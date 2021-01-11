import Admin from '../components/Admin/Admin'
import { route } from './index'

const adminRoute:route = {
  path: "/admin",
  public: false,
  component: Admin
}

export default adminRoute