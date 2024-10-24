import React, { useState } from "react"
import { Discount, Product } from "../../types"
import { validationDiscount } from "./utils/adminUtils"

const initDiscount: Discount = { quantity: 0, rate: 0 }

export const useDiscount = (product: Product, onProductUpdate: (newProduct: Product) => void) => {
  const [newDiscount, setNewDiscount] = useState<Discount>(initDiscount)

  /**
   * 할인 추가
   * @returns
   */
  const handleClickAddDiscount = () => {
    if (!validationDiscount(newDiscount)) return

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
