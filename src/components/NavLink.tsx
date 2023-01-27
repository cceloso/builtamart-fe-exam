import React from 'react'
import { Link } from 'react-router-dom'
interface NavLinkProps {
    label: string
    link: string
}

const NavLink = (props: NavLinkProps) => {
  return (
    <li className="px-4 hover:text-dark-orange transition duration-150 font-semibold">
        <Link to={props.link}>{props.label}</Link>
    </li>
  )
}

export default NavLink