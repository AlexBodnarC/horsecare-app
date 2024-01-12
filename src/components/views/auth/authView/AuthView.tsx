import { FC } from "react"
import { Link, Navigate, useLocation } from "react-router-dom"
import useAuth from "hooks/useAuth"
import { routes } from "utils/constants"
import { Heading } from "components/ui"
import { SignInForm, SignUpForm } from "components/views/auth/authView"
import s from "./AuthView.module.css"

const AuthView: FC = () => {
  const { pathname } = useLocation()

  const { user } = useAuth()

  const { HOME_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } = routes

  const isSignInView = pathname === SIGN_IN_ROUTE

  const currentData = {
    title: isSignInView ? "Sign In" : "Sign Up",
    form: isSignInView ? <SignInForm /> : <SignUpForm />,
    text: isSignInView ? "Don't have an account? " : "Have an account? ",
    routeTo: isSignInView ? SIGN_UP_ROUTE : SIGN_IN_ROUTE,
    linkName: isSignInView ? "Sign Up" : "Sign In"
  }

  const { title, form, routeTo, text, linkName } = currentData

  if (user) {
    return <Navigate to={HOME_ROUTE} />
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Heading level={2}>{title}</Heading>

        {form}

        <p className={s.text}>
          {text}

          <Link to={routeTo} className={s.link}>
            {linkName}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthView
