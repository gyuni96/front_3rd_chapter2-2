import { useEffect, useState } from "react"
import { Product } from "../../types"
import { updateValue } from "./utils/commonUtils"

type FormDataType = {
  name: string
  price: number
  stock: number
}

export const useUpdateProductForm = (
  product: Product,
  onProductUpdate: (updatedProduct: Product) => void
) => {
  const [isEdit, setEditMode] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormDataType>({ name: "", price: 0, stock: 0 })

  useEffect(() => {
    const { name, price, stock } = product
    setFormData({ name, price, stock })
  }, [product])

  /**
   * 폼 데이터 업데이트
   * @param key
   * @param value
   */
  const updateFormData = <K extends keyof FormDataType>(key: K, value: FormDataType[K]) => {
    setFormData((prev) => updateValue(prev, key, value))
  }

  /**
   * 수정 완료
   * @returns
   */
  const completeModify = () => {
    const { name, price, stock } = formData

    if (!name || !price || !stock) {
      return alert("모든 항목을 입력해주세요")
    }

    onProductUpdate({ ...product, name, price, stock })
    setEditMode(false)
  }

  /**
   * 수정 모드 토글
   */
  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  return { isEdit, formData, updateFormData, completeModify, toggleEditMode }
}
