import { FC, FormEvent, useState } from "react"
import useProfessionals from "hooks/useProfessionals"
import { Badge, Button, InputField } from "components/ui"
import { ProfessionalCard } from "components/views/search"
import { IInputData } from "types"
import s from "./Search.module.css"

const initialData = {
  term: ""
}

const SearchView: FC = () => {
  const [inputData, setInputData] = useState(initialData)

  const { term } = inputData

  const {
    professionals,
    popularProfessionals,
    getProfessionals,
    getProfessionalByTerm
  } = useProfessionals()

  const handleInputChange = ({ name, value }: IInputData) => {
    setInputData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()

    if (!term) return

    getProfessionalByTerm(term)
  }

  const handleShowAll = async () => {
    getProfessionals()
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

          {popularProfessionals && (
            <div className={s.badgeList}>
              {popularProfessionals.map(({ id, name }) => (
                <Badge
                  key={id}
                  text={name}
                  onClick={() => handleBadgeClick(name)}
                />
              ))}
            </div>
          )}
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
