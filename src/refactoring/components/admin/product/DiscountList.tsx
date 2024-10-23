import { Product } from "../../../../types"
import DiscountForm from "./DiscountForm"

type Props = {
  product: Product
  isEdit: boolean
  onProductUpdate: (item: Product) => void
}

const DiscountList = ({ product, isEdit, onProductUpdate }: Props) => {
  const handleRemoveDiscount = (index: number) => {
    product.discounts.splice(index, 1)
    onProductUpdate(product)
  }

  return (
    <>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>

      {product.discounts.map(({ quantity, rate }, index: number) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {quantity}개 이상 구매 시 {rate * 100}% 할인
          </span>

          {isEdit && (
            <button
              onClick={() => handleRemoveDiscount(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          )}
        </div>
      ))}

      {/* 할인 편집 */}
      {isEdit && <DiscountForm product={product} onProductUpdate={onProductUpdate} />}
    </>
  )
}

export default DiscountList
