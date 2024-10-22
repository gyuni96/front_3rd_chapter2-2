import { CartItem, Coupon } from "../../../types"

/**
 * 아이템 가격을 계산
 * @param item
 * @returns
 */
export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product
  const { quantity } = item
  const discount = getMaxApplicableDiscount(item)

  return price * quantity * (1 - discount)
}

/**
 * 최대 할인율 계산
 * @param item
 * @returns
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product
  const { quantity } = item

  // 할인이 가장 큰 값을 찾아서 할인을 적용
  const discount = discounts.reduce((maxDiscount, cur) => {
    return quantity >= cur.quantity && cur.rate > maxDiscount ? cur.rate : maxDiscount
  }, 0)

  return discount
}

/**
 * 장바구니 총 가격 계산
 * @param cart
 * @param selectedCoupon
 * @returns
 */
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  let totalAfterDiscount = cart.reduce((total, item) => {
    return total + calculateItemTotal(item)
  }, 0)

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount

  if (selectedCoupon) {
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

/**
 * 장바구니 아이템 수량 업데이트
 * @param cart
 * @param productId
 * @param newQuantity
 * @returns
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity === 0) {
    // 수량이 0이면 삭제
    return cart.filter((item) => item.product.id !== productId)
  }

  return cart.map((item) =>
    item.product.id === productId
      ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
      : item
  )
}
