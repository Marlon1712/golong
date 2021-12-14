import React from 'react'
import { Nav } from '../styles/components/Nav'
import Burger from '../components/Burger'
import Link from 'next/link'

const Navbar = (): JSX.Element => {
  return (
    <Nav>
      <Link href="/">
        <a className="links">GoLong</a>
      </Link>
      <Burger />
    </Nav>
  )
}
export default Navbar
