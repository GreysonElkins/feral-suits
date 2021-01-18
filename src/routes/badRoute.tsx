import { route } from './index'


const noRoute:React.FC = () => {
  return (
    <div style={{color: "#6FEC73"}}>The page you're looking for does not exist.</div>
  )
}
  
const badRoute:route = {
  path: '*',
  visible: false,
  component: noRoute 
}

export default badRoute