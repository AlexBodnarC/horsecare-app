import { FC } from "react"
import s from "./Loader.module.css"

const Loader: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.element} />
    </div>
  )
}

export default Loader
