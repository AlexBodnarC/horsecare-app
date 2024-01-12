import { FC, createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "utils/supabase"
import { routes } from "utils/constants"
import notify from "utils/notify"
import { IChildren, User } from "types"

interface IAuthData {
  email: string
  password: string
}

interface IAuthContext {
  user: User | null
  isLoading: boolean
  signIn: (authData: IAuthData) => void
  signUp: (authData: IAuthData) => void
  signOut: () => void
}

const SUCCESS_MESSAGE = "Welcome"

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: FC<IChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { HOME_ROUTE } = routes

  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)

      const { data } = await supabase.auth.getSession()

      if (data.session) {
        setUser(data.session.user)
      }

      setIsLoading(false)
    }

    getSession()
  }, [])

  const signIn = async (authData: IAuthData) => {
    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword(authData)

    if (!error) {
      setUser(data.user)

      notify(SUCCESS_MESSAGE, "success")

      navigate(HOME_ROUTE)
    } else {
      notify(error.message, "error")
    }

    setIsLoading(false)
  }

  const signUp = async (authData: IAuthData) => {
    setIsLoading(true)

    const { data, error } = await supabase.auth.signUp(authData)

    if (!error) {
      setUser(data.user)

      notify(SUCCESS_MESSAGE, "success")

      navigate(HOME_ROUTE)
    } else {
      notify(error.message, "error")
    }

    setIsLoading(false)
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      setUser(null)

      notify("Good-Bye", "success")

      navigate(HOME_ROUTE)
    } else {
      notify(error.message, "error")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
