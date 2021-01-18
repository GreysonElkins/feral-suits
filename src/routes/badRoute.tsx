import { route } from './index'


const noRoute:React.FC = () => {
  return (
    <div>The page you're looking for does not exist.</div>
  )
}
  
const badRoute:route = {
  path: '*',
  visible: true,
  component: noRoute 
}

export default badRoute