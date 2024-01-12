import toast from "react-hot-toast"

type MessageType = "success" | "error"

export default function notify(message: string, type: MessageType) {
  switch (type) {
    case "success":
      toast.success(message)
      break

    case "error":
      toast.error(message)
      break

    default:
      toast(message)
  }
}
