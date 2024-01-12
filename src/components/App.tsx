import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "contexts/AuthProvider"
import { Layout } from "components/layout"
import { AppRouter } from "components/router"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <AppRouter />
          <Toaster />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
