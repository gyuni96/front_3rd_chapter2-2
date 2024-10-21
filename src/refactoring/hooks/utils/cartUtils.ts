import { CartItem, Coupon } from "../../../types"

/**
 * 아이템 가격을 계산합니다.
 * @param item
 * @returns
 */
export const calculateItemTotal = (item: CartItem) => {
  const { price, discounts } = item.product
  const { quantity } = item

  // 할인이 가장 큰 값을 찾아서 할인을 적용합니다.
  const discount = discounts.reduce((maxDiscount, cur) => {
    return quantity >= cur.quantity && cur.rate > maxDiscount ? cur.rate : maxDiscount
  }, 0)

  return price * quantity * (1 - discount)
}

export const getMaxApplicableDiscount = (item: CartItem) => {
  return 0
}

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = 0
  let totalAfterDiscount = 0
  let totalDiscount = 0
  cart.forEach((item) => {
    const { price } = item.product
    const { quantity } = item

    totalBeforeDiscount += price * quantity
    totalAfterDiscount += calculateItemTotal(item)
  })
  totalDiscount = totalBeforeDiscount - totalAfterDiscount

  if (selectedCoupon) {
    // 선택된 쿠폰이있으면 할인해야댐
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue)
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount), // 할인전 가격
    totalAfterDiscount: Math.round(totalAfterDiscount), // 할인된 가격
    totalDiscount: Math.round(totalDiscount), // 할인가격
  }
}

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart.map((item) =>
    item.product.id === productId
      ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
      : item
  )
}
