import { FC } from "react"
import { Link } from "react-router-dom"
import { routes } from "utils/constants"
import { Button, Heading } from "components/ui"
import s from "./HomeView.module.css"

const HomeView: FC = () => {
  const { SEARCH_ROUTE } = routes

  return (
    <div className={s.container}>
      <Heading level={1}>Welcome to the Horsecare Marketplace</Heading>

      <p className={s.text}>
        Browse our network of skilled horse care professionals, choose the one
        you like best, and take advantage of their services.
      </p>

      <Link to={SEARCH_ROUTE}>
        <Button padding="16px 24px">Get Started</Button>
      </Link>
    </div>
  )
}

export default HomeView
