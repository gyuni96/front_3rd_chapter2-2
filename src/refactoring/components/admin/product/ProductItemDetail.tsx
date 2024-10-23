import { useEffect, useState } from "react"
import { Product } from "../../../../types"
import DiscountList from "./DiscountList"
import UpdateProductItemForm from "./UpdateProductItemForm"

type Props = {
  product: Product
  onProductUpdate: (updatedProduct: Product) => void
}

type FormDataType = {
  name: string
  price: number
  stock: number
}

const ProductItemDetail = ({ product, onProductUpdate }: Props) => {
  const [isEdit, setEditMode] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormDataType>({ name: "", price: 0, stock: 0 })

  useEffect(() => {
    const { name, price, stock } = product
    setFormData({ name, price, stock })
  }, [product])

  //   form 입력 시 업데이트
  const updateFormData = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  //   수정완료
  const completeModify = () => {
    const { name, price, stock } = formData

    if (!name || !price || !stock) {
      return alert("모든 항목을 입력해주세요")
    }

    onProductUpdate({ ...product, name, price, stock })
    setEditMode(false)
  }

  return (
    <>
      {isEdit ? (
        <UpdateProductItemForm formData={formData} updateFormData={updateFormData} />
      ) : null}
      <DiscountList product={product} isEdit={isEdit} onProductUpdate={onProductUpdate} />
      {isEdit ? (
        <button
          onClick={completeModify}
          className="text-white px-2 py-1 rounded bg-green-500 hover:bg-green-600 mt-2"
        >
          수정 완료
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          data-testid="modify-button"
          className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 mt-2"
        >
          수정
        </button>
      )}
    </>
  )
}

export default ProductItemDetail
