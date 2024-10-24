import { useState } from "react"
import { Product } from "../../types"
import { initProduct } from "../constants/initialData"

export const useNewProductForm = (
  onProductAdd: (newProduct: Product) => void,
  setShowNewProductForm: (show: boolean) => void
) => {
  const [newProductForm, setNewProductForm] = useState<Omit<Product, "id">>(initProduct)

  /**
   * 새로운 상품 업데이트
   * @param key
   * @param value
   */
  const handleChangeUpdateNewProductForm = <K extends keyof Product>(key: K, value: Product[K]) => {
    setNewProductForm((prev) => ({ ...prev, [key]: value }))
  }

  /**
   * 새로운 상품 폼 초기화
   * @returns
   */
  const resetNewProductForm = () => setNewProductForm(initProduct)

  const handleAddNewProduct = () => {
    const { name, price, stock } = newProductForm
    onProductAdd({ id: name, name, price, stock, discounts: [] })
    setShowNewProductForm(false)
    resetNewProductForm()
  }

  return {
    newProductForm,
    handleChangeUpdateNewProductForm,
    resetNewProductForm,
    handleAddNewProduct,
  }
}
