import { FC } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "hooks/useAuth"
import { routes } from "utils/constants"
import { Button } from "components/ui"

const AuthButton: FC = () => {
  const { user, isLoading, signOut } = useAuth()

  const { SIGN_IN_ROUTE } = routes

  const navigate = useNavigate()

  if (isLoading) {
    return null
  }

  const handleClick = () => {
    if (user) {
      signOut()
    } else {
      navigate(SIGN_IN_ROUTE)
    }
  }

  return <Button onClick={handleClick}>{user ? "Logout" : "Sign In"}</Button>
}

export default AuthButton
