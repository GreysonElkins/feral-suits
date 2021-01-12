import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import routes from '../../routes'
import './Header.scss'

type headerProps = {
  hiddenNav?: boolean
}

const Header:React.FC<headerProps> = ({ hiddenNav }) => {

  const buildNav = ():React.ReactNode => {
    const onlyPublicRoutes = routes.filter(({ visible }) => visible)
    const links = onlyPublicRoutes.map(({ path }) => (
      <NavLink to={path}>{path.substring(1)}</NavLink>
    ))
    return (<nav>{links}</nav>)
  }

  return (
    <header>
      <h1>
        <Link to='/' itemProp="name" className="band-name">Feral Suits</Link>
      </h1>
      {!hiddenNav &&
        buildNav()
      }
    </header>
  )
}

export default Header

