import { getAppliedDiscount } from "../../hooks/utils/cartUtils"
import { CartItem } from "../../../types"

type Props = {
  item: CartItem
  handleClickUpdateQuantity: (productId: string, quantity: number) => void
  handleClickRemoveCart: (productId: string) => void
}

const UserCartItem = ({ item, handleClickUpdateQuantity, handleClickRemoveCart }: Props) => {
  const appliedDiscount = getAppliedDiscount(item)

  return (
    <>
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div>
        <button
          onClick={() => handleClickUpdateQuantity(item.product.id, item.quantity - 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() => handleClickUpdateQuantity(item.product.id, item.quantity + 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          +
        </button>
        <button
          onClick={() => handleClickRemoveCart(item.product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </>
  )
}

export default UserCartItem
