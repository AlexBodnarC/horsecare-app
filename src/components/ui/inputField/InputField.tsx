import { CSSProperties, ChangeEvent, FC, InputHTMLAttributes } from "react"
import { IInputData } from "types"
import s from "./InputField.module.css"

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  onInputChange: (data: IInputData) => void
}

const InputField: FC<IInputField> = ({
  type = "text",
  name,
  value,
  disabled,
  placeholder,
  label,
  error,
  onInputChange
}) => {
  const inputStyles: CSSProperties = {
    border: error
      ? "1px solid var(--error-color)"
      : "1px solid var(--input-border-color)"
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e

    onInputChange({
      name: target.name,
      value: target.value
    })
  }

  return (
    <div className={s.container}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={s.input}
        style={inputStyles}
        onChange={handleChange}
      />

      {error && <p className={s.error}>{error}</p>}
    </div>
  )
}

export default InputField
