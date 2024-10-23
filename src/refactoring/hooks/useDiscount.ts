import React, { useState } from "react"
import { Discount, Product } from "../../types"

const initDiscount: Discount = { quantity: 0, rate: 0 }

export const useDiscount = (product: Product, onProductUpdate: (newProduct: Product) => void) => {
  const [newDiscount, setNewDiscount] = useState<Discount>(initDiscount)

  /**
   * 할인 추가
   * @returns
   */
  const handleClickAddDiscount = () => {
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
    setNewDiscount(initDiscount)
  }

  /**
   * 할인 수량 편집
   * @param e
   */
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))
  }

  /**
   * 할인 수량 편집
   * @param e
   */
  const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount((prev) => ({ ...prev, rate: parseInt(e.target.value) / 100 }))
  }

  return { newDiscount, handleClickAddDiscount, handleChangeQuantity, handleChangeRate }
}
