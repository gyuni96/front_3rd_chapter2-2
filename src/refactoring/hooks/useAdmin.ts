import { useState } from "react"

export const useAdmin = () => {
  const [isAdmin, setAdmin] = useState(false)

  const toggleAdmin = () => {
    setAdmin((prev) => !prev)
  }

  return { isAdmin, toggleAdmin }
}
