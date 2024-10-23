import React, { useState } from "react"
import { Discount, Product } from "../../../../types"

type Props = {
  product: Product
  onProductUpdate: (item: Product) => void
}

const DiscountForm = ({ product, onProductUpdate }: Props) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 })

  // 상품 할인 정보 추가
  const handleAddDiscount = () => {
    if (newDiscount.quantity <= 0) {
      return newDiscount.quantity === 0
        ? alert("수량 정보를 입력해주세요.")
        : alert("수량 정보는 0보다 커야합니다.")
    }
    if (newDiscount.rate <= 0) {
      return newDiscount.rate === 0
        ? alert("할인 정보를 입력해주세요.")
        : alert("할인 정보는 0보다 커야합니다.")
    }

    const newProduct = { ...product }

    newProduct.discounts.push(newDiscount)
    onProductUpdate(newProduct)

    //초기화
    setNewDiscount({ quantity: 0, rate: 0 })
  }

  // 할인 개수 편집
  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))
  }

  // 할인율 편집
  const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount((prev) => ({ ...prev, rate: parseInt(e.target.value) / 100 }))
  }

  return (
    <div className="flex space-x-2">
      <input
        type="number"
        value={newDiscount.quantity}
        placeholder="수량"
        onChange={handleQty}
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        value={newDiscount.rate * 100}
        placeholder="할인율 (%)"
        onChange={handleRate}
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={handleAddDiscount}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  )
}

export default DiscountForm
