import { Product } from "../../../../types"
import { useNewProductForm } from "../../../hooks"
import LabelInput from "./LabelInput"

type Props = {
  onProductAdd: (newProduct: Product) => void
  setShowNewProductForm(show: boolean): void
}

const AddProductForm = ({ onProductAdd, setShowNewProductForm }: Props) => {
  const { newProductForm, handleChangeUpdateNewProductForm, resetNewProductForm } =
    useNewProductForm()

  const handleAddNewProduct = () => {
    const { name, price, stock } = newProductForm
    onProductAdd({ id: name, name, price, stock, discounts: [] })
    setShowNewProductForm(false)
    resetNewProductForm()
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <LabelInput
        id="productName"
        label="상품명"
        type="text"
        value={newProductForm.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeUpdateNewProductForm("name", e.target.value)
        }
      />
      <LabelInput
        id="productPrice"
        label="가격"
        type="number"
        value={newProductForm.price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeUpdateNewProductForm("price", +e.target.value)
        }
      />
      <LabelInput
        id="productStock"
        label="재고"
        type="number"
        value={newProductForm.stock}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeUpdateNewProductForm("stock", +e.target.value)
        }
      />
      <button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  )
}

export default AddProductForm
