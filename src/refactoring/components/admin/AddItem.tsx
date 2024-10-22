import { useState } from "react"
import { Product } from "../../../types"
import LabelInput from "./LabelInput"

type Props = {
  onProductAdd: (newProduct: Product) => void
}

const AddItem = ({ onProductAdd }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  })

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() }
    onProductAdd(productWithId)
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    })
    setShowNewProductForm(false)
  }

  return (
    <>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          <LabelInput
            id="productName"
            label="상품명"
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <LabelInput
            id="productPrice"
            label="가격"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
          />
          <LabelInput
            id="productStock"
            label="재고"
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
          />
          <button
            onClick={handleAddNewProduct}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            추가
          </button>
        </div>
      )}
    </>
  )
}

export default AddItem
