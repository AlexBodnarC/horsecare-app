import { FC, useEffect, useState } from "react"
import { supabase } from "utils/supabase"
import notify from "utils/notify"
import { Badge } from "components/ui"
import { IProfessional } from "types"
import s from "./PopularProfessionals.module.css"

interface IPopularProfessionals {
  onBadgeClick: (badgeName: string) => void
}

const PopularProfessionals: FC<IPopularProfessionals> = ({ onBadgeClick }) => {
  const [popularProfessionals, setPopularProfessionals] = useState<
    IProfessional[] | null
  >(null)

  useEffect(() => {
    const getPopularProfessionals = async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .gt("rate", 3)

      if (!error) {
        setPopularProfessionals(data)
      } else {
        notify(error.message, "error")
      }
    }

    getPopularProfessionals()
  }, [])

  return (
    popularProfessionals && (
      <div className={s.badgeList}>
        {popularProfessionals.map(({ id, name }) => (
          <Badge key={id} text={name} onClick={() => onBadgeClick(name)} />
        ))}
      </div>
    )
  )
}

export default PopularProfessionals
