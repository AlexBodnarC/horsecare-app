import { useContext } from "react"
import { ProfessionalsContext } from "contexts/ProfessionalsProvider"

function useProfessionals() {
  const context = useContext(ProfessionalsContext)

  if (!context) {
    throw new Error(
      "useProfessionals must be used within a ProfessionalsProvider"
    )
  }

  return context
}

export default useProfessionals
