import { FC } from "react"
import { Link } from "react-router-dom"
import { routes } from "utils/constants"
import { AuthButton } from "components/views/auth"
import s from "./Navbar.module.css"

const Navbar: FC = () => {
  const { HOME_ROUTE } = routes

  return (
    <nav className={s.navbar}>
      <Link to={HOME_ROUTE} className={s.logo}>
        Horse Pro
      </Link>

      <AuthButton />
    </nav>
  )
}

export default Navbar
