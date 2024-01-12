import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import { routes } from "utils/constants"
import { PrivateWrapper } from "components/router"
import {
  AuthView,
  HomeView,
  SearchView,
  ProfessionalView
} from "components/views"

const AppRouter: FC = () => {
  const {
    HOME_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
    SEARCH_ROUTE,
    PROFESSIONAL_ROUTE
  } = routes

  const publicRoutes = [
    {
      element: <HomeView />,
      path: HOME_ROUTE
    },
    {
      element: <AuthView />,
      path: SIGN_IN_ROUTE
    },
    {
      element: <AuthView />,
      path: SIGN_UP_ROUTE
    }
  ]

  const privateRoutes = [
    {
      element: <SearchView />,
      path: SEARCH_ROUTE
    },
    {
      element: <ProfessionalView />,
      path: `${PROFESSIONAL_ROUTE}/:id`
    }
  ]

  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        {privateRoutes.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Route>

      {publicRoutes.map(({ element, path }) => (
        <Route key={path} element={element} path={path} />
      ))}
    </Routes>
  )
}

export default AppRouter
