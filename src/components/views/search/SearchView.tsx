import { FC, FormEvent, useState } from "react"
import { supabase } from "utils/supabase"
import notify from "utils/notify"
import { Button, InputField } from "components/ui"
import { PopularProfessionals, ProfessionalCard } from "components/views/search"
import { IInputData, IProfessional } from "types"
import s from "./Search.module.css"

const initialData = {
  term: ""
}

const SearchView: FC = () => {
  const [professionals, setProfessionals] = useState<IProfessional[] | null>(
    null
  )

  const [inputData, setInputData] = useState(initialData)

  const { term } = inputData

  const handleInputChange = ({ name, value }: IInputData) => {
    setInputData((prevState) => ({ ...prevState, [name]: value }))
  }

  const getProfessionalByTerm = async (term: string) => {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .ilike("name", `%${term}%`)

    if (!error) {
      setProfessionals(data)
    } else {
      notify(error.message, "error")
    }
  }

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()

    if (!term) return

    getProfessionalByTerm(term)
  }

  const handleShowAll = async () => {
    const { data, error } = await supabase.from("professionals").select("*")

    if (!error) {
      setProfessionals(data)
    } else {
      notify(error.message, "error")
    }
  }

  const handleBadgeClick = async (badgeName: string) => {
    setInputData({ term: badgeName })

    getProfessionalByTerm(badgeName)
  }

  return (
    <>
      <form onSubmit={handleSearch} className={s.form}>
        <div className={s.fieldsAndBadges}>
          <InputField
            name="term"
            value={term}
            placeholder="Professional"
            onInputChange={handleInputChange}
          />

          <PopularProfessionals onBadgeClick={handleBadgeClick} />
        </div>

        <div className={s.buttons}>
          <Button type="submit">Search</Button>
          <Button onClick={handleShowAll}>Show All</Button>
        </div>
      </form>

      {professionals && (
        <div className={s.professionalList}>
          {professionals.map((p) => (
            <ProfessionalCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </>
  )
}

export default SearchView
