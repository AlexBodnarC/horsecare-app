import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "contexts/AuthProvider"
import { ProfessionalsProvider } from "contexts/ProfessionalsProvider"
import { Layout } from "components/layout"
import { AppRouter } from "components/router"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfessionalsProvider>
          <Layout>
            <AppRouter />
            <Toaster />
          </Layout>
        </ProfessionalsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
