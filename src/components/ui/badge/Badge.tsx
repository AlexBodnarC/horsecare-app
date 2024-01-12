import { FC } from "react"
import s from "./Badge.module.css"

interface IBadge {
  text: string
  onClick: () => void
}

const Badge: FC<IBadge> = ({ text, onClick }) => {
  return (
    <span role="button" tabIndex={0} className={s.badge} onClick={onClick}>
      {text}
    </span>
  )
}

export default Badge
