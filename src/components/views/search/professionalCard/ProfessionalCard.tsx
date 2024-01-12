import { CSSProperties, FC } from "react"
import { Link } from "react-router-dom"
import { routes } from "utils/constants"
import { IProfessional } from "types"
import s from "./ProfessionalCard.module.css"

const ProfessionalCard: FC<IProfessional> = (professionalInfo) => {
  const { id, name, imageUrl, isActive } = professionalInfo

  const { PROFESSIONAL_ROUTE } = routes

  const cardStyles: CSSProperties = {
    opacity: isActive ? 1 : 0.5,
    pointerEvents: isActive ? "auto" : "none"
  }

  return (
    <Link to={`${PROFESSIONAL_ROUTE}/${id}`}>
      <div className={s.card} style={cardStyles}>
        <img src={imageUrl} alt={name} className={s.avatar} />

        <span className={s.name}>{name}</span>
      </div>
    </Link>
  )
}

export default ProfessionalCard
