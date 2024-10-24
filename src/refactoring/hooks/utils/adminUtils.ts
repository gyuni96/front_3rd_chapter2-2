import { Discount } from "../../../types"

export const validationDiscount = (discount: Discount) => {
  if (!validationQuantity(discount.quantity)) return false
  if (!validationRate(discount.rate)) return false

  return true
}

const validationQuantity = (quantity: number) => {
  return quantity > 0
}

const validationRate = (rate: number) => {
  return rate > 0
}
