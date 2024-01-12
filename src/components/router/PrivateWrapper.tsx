import { FC } from "react"
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "hooks/useAuth"
import { routes } from "utils/constants"
import { Loader } from "components/ui"

const PrivateWrapper: FC = () => {
  const { user, isLoading } = useAuth()

  const { SIGN_IN_ROUTE } = routes

  if (isLoading) {
    return <Loader />
  }

  return user ? <Outlet /> : <Navigate to={SIGN_IN_ROUTE} />
}

export default PrivateWrapper
