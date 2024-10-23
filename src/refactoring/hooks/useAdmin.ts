import { useState } from "react"

export const useAdmin = () => {
  const [isAdmin, setAdmin] = useState(false)

  /**
   * 어드민 모드 토글
   */
  const toggleAdmin = () => {
    setAdmin((prev) => !prev)
  }

  return { isAdmin, toggleAdmin }
}
