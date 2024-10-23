import { useState } from "react"
import { Discount, Product } from "../../types"

export const useNewProductForm = (initProduct: Omit<Product, "id">) => {
  const [newProductForm, setNewProductForm] = useState<Omit<Product, "id">>(initProduct)

  const updateNewProductForm = (
    key: keyof Omit<Product, "id" | "discounts">,
    value: string | number | Discount[]
  ) => {
    setNewProductForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetNewProductForm = () => setNewProductForm(initProduct)

  return { newProductForm, updateNewProductForm, resetNewProductForm }
}
