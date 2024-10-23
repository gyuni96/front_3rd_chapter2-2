import { useState } from "react"
import { Product } from "../../../../types"
import { useNewProductForm } from "../../../hooks"
import AddItemForm from "./AddItemForm"

type Props = {
  onProductAdd: (newProduct: Product) => void
}

const AddItem = ({ onProductAdd }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const { newProductForm, updateNewProductForm, resetNewProductForm } = useNewProductForm({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  })

  const handleAddNewProduct = ({ name, price, stock }: Omit<Product, "id" | "discounts">) => {
    onProductAdd({ id: name, name, price, stock, discounts: [] })
    setShowNewProductForm(false)
    resetNewProductForm()
  }

  const handleFormData = (key: keyof Omit<Product, "id" | "discounts">, value: string | number) => {
    updateNewProductForm(key, value)
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
        <AddItemForm
          newProductForm={newProductForm}
          handleFormData={handleFormData}
          handleAddNewProduct={handleAddNewProduct}
        />
      )}
    </>
  )
}

export default AddItem
