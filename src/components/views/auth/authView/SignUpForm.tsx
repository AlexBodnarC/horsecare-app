import { FC, FormEvent, useState } from "react"
import useAuth from "hooks/useAuth"
import { Button, InputField } from "components/ui"
import { IInputData } from "types"
import s from "./AuthView.module.css"

const initialData = {
  email: "",
  password: ""
}

const SignUpForm: FC = () => {
  const [inputData, setInputData] = useState(initialData)

  const { email, password } = inputData

  const { signUp } = useAuth()

  const handleInputChange = ({ name, value }: IInputData) => {
    setInputData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    signUp(inputData)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.fields}>
        <InputField
          name="email"
          value={email}
          placeholder="Email"
          onInputChange={handleInputChange}
        />
        <InputField
          name="password"
          value={password}
          placeholder="Password"
          onInputChange={handleInputChange}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  )
}

export default SignUpForm
