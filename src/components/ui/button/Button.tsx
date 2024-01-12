import { ButtonHTMLAttributes, CSSProperties, FC } from "react"
import s from "./Button.module.css"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  padding?: string
  border?: string
  bgColor?: string
  color?: string
}

const Button: FC<IButton> = ({
  type = "button",
  disabled = false,
  children,
  width,
  padding,
  border,
  bgColor,
  color,
  ...rest
}) => {
  const btnStyles: CSSProperties = {
    width: width || "auto",
    padding: padding || "10px 20px",
    border: border || "none",
    backgroundColor: bgColor || "var(--primary-color)",
    color: color || "#fff"
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={s.button}
      style={btnStyles}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
