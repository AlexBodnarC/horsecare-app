import { FC, createContext, useEffect, useState } from "react"
import { supabase } from "utils/supabase"
import notify from "utils/notify"
import { IChildren, IProfessional } from "types"

interface IProfessionalsContext {
  professionals: IProfessional[] | null
  popularProfessionals: IProfessional[] | null
  isLoading: boolean
  getProfessionals: () => void
  getProfessionalByTerm: (term: string) => void
}

export const ProfessionalsContext = createContext<
  IProfessionalsContext | undefined
>(undefined)

export const ProfessionalsProvider: FC<IChildren> = ({ children }) => {
  const [professionals, setProfessionals] = useState<IProfessional[] | null>(
    null
  )

  const [popularProfessionals, setPopularProfessionals] = useState<
    IProfessional[] | null
  >(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPopularProfessionals = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .gt("rate", 3)

      if (!error) {
        setPopularProfessionals(data)
      } else {
        notify(error.message, "error")
      }

      setIsLoading(false)
    }

    getPopularProfessionals()
  }, [])

  const getProfessionals = async () => {
    setIsLoading(true)

    const { data, error } = await supabase.from("professionals").select("*")

    if (!error) {
      setProfessionals(data)
    } else {
      notify(error.message, "error")
    }

    setIsLoading(false)
  }

  const getProfessionalByTerm = async (term: string) => {
    setIsLoading(true)

    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .ilike("name", `%${term}%`)

    if (!error) {
      setProfessionals(data)
    } else {
      notify(error.message, "error")
    }

    setIsLoading(false)
  }

  return (
    <ProfessionalsContext.Provider
      value={{
        professionals,
        popularProfessionals,
        isLoading,
        getProfessionals,
        getProfessionalByTerm
      }}
    >
      {children}
    </ProfessionalsContext.Provider>
  )
}
