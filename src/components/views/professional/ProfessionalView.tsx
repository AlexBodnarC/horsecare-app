import { FC, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "utils/supabase"
import notify from "utils/notify"
import { Button, Loader } from "components/ui"
import { IProfessional } from "types"
import s from "./ProfessionalView.module.css"

const ProfessionalView: FC = () => {
  const [currentProfessional, setCurrentProfessional] =
    useState<IProfessional | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getProfessionalById = async (id: string) => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", id)

      if (!error) {
        setCurrentProfessional(data[0])
      } else {
        notify(error.message, "error")
      }

      setIsLoading(false)
    }

    if (id) {
      getProfessionalById(id)
    }
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleReserve = async () => {
    const { error } = await supabase
      .from("professionals")
      .update({ isActive: false })
      .eq("id", id)

    if (!error) {
      notify("You have successfully reserved a professional", "success")

      navigate(-1)
    } else {
      notify(error.message, "error")
    }
  }

  return !isLoading ? (
    currentProfessional && (
      <div className={s.container}>
        <section className={s.section}>
          <img
            src={currentProfessional.imageUrl}
            alt={currentProfessional.name}
            className={s.image}
          />
        </section>

        <section className={s.section}>
          <span className={s.name}>{currentProfessional.name}</span>

          <p>{currentProfessional.description}</p>

          <div className={s.buttons}>
            <Button bgColor="#d1d5db" onClick={handleBack}>
              Cancel
            </Button>

            <Button
              disabled={!currentProfessional.isActive}
              onClick={handleReserve}
            >
              Reserve
            </Button>
          </div>
        </section>
      </div>
    )
  ) : (
    <Loader />
  )
}

export default ProfessionalView
