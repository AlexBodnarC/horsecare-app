import { FC } from "react"
import { Navbar } from "components/navbar"
import { IChildren } from "types"
import s from "./Layout.module.css"

const Layout: FC<IChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Navbar />

      <main className={s.content}>{children}</main>
    </div>
  )
}

export default Layout
