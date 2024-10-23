import { Product } from "../../../../types"
import { useDiscount } from "../../../hooks"

type Props = {
  product: Product
  onProductUpdate: (item: Product) => void
}

const DiscountForm = ({ product, onProductUpdate }: Props) => {
  const { newDiscount, handleClickAddDiscount, handleChangeQuantity, handleChangeRate } =
    useDiscount(product, onProductUpdate)

  return (
    <div className="flex space-x-2">
      <input
        type="number"
        value={newDiscount.quantity}
        placeholder="수량"
        onChange={handleChangeQuantity}
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        value={newDiscount.rate * 100}
        placeholder="할인율 (%)"
        onChange={handleChangeRate}
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={handleClickAddDiscount}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  )
}

export default DiscountForm
