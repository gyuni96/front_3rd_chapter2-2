import { Product } from "../../../../types"
import LabelInput from "./LabelInput"

type Props = {
  newProductForm: {
    name: string
    price: number
    stock: number
  }
  handleFormData: (key: keyof Omit<Product, "id" | "discounts">, value: string | number) => void
  handleAddNewProduct: (newProduct: { name: string; price: number; stock: number }) => void
}

const AddItemForm = ({ newProductForm, handleFormData, handleAddNewProduct }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <LabelInput
        id="productName"
        label="상품명"
        type="text"
        value={newProductForm.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFormData("name", e.target.value)
        }
      />
      <LabelInput
        id="productPrice"
        label="가격"
        type="number"
        value={newProductForm.price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFormData("price", +e.target.value)
        }
      />
      <LabelInput
        id="productStock"
        label="재고"
        type="number"
        value={newProductForm.stock}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFormData("stock", +e.target.value)
        }
      />
      <button
        onClick={() => handleAddNewProduct(newProductForm)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  )
}

export default AddItemForm
