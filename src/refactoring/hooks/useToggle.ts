import { useState } from "react"

export const useToggle = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set())

  /**
   * 상품 아코디언 토글
   * @param productId
   */
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return { openProductIds, toggleProductAccordion }
}
