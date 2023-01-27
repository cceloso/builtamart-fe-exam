import { Link } from "react-router-dom"
import Logo from "../assets/builtamart-logo.avif"
import Container from "./Container"
import NavLink from "./NavLink"

const Navbar = () => {
  return (
    <Container styles="py-2 md:py-6 bg-dark-charcoal text-white">
        <div className="flex items-center gap-4 md:gap-8 lg:gap-10">
            <Link to="/">
                <img className="w-11 md:w-14 lg:w-16" src={Logo} alt="BuiltaMart Logo" />
            </Link>
            <nav>
                <ul className="flex">
                    <NavLink label="Employees" link="/employees" />
                    <NavLink label="Jobs" link="/jobs" />
                </ul>
            </nav>
        </div>
    </Container>
  )
}

export default Navbar