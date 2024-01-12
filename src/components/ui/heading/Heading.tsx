import { FC, JSX } from "react"
import { IChildren } from "types"
import s from "./Heading.module.css"

interface IHeading extends IChildren {
  level: number
  align?: "left" | "center" | "right"
}

const Heading: FC<IHeading> = ({ level, align = "center", children }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <HeadingTag className={s[`h${level}`]} style={{ textAlign: align }}>
      {children}
    </HeadingTag>
  )
}

export default Heading
