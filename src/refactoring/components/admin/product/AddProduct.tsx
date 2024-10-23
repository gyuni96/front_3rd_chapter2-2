import { useState } from "react"
import { Product } from "../../../../types"
import AddProductForm from "./AddProductForm"

type Props = {
  onProductAdd: (newProduct: Product) => void
}

const AddProduct = ({ onProductAdd }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowNewProductForm((prev) => !prev)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <AddProductForm onProductAdd={onProductAdd} setShowNewProductForm={setShowNewProductForm} />
      )}
    </>
  )
}

export default AddProduct
