import { CartItem, Coupon, Product } from "../../../types"

/**
 * 아이템 가격을 계산
 * @param item
 * @returns
 */
export function calculateItemTotal(item: CartItem) {
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
export function getMaxApplicableDiscount(item: CartItem) {
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
export function calculateCartTotal(cart: CartItem[], selectedCoupon: Coupon | null) {
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
export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] {
  return [...cart]
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity))
        return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null
      }
      return item
    })
    .filter((item): item is CartItem => item !== null)
}

export function getMaxDiscount(discounts: { quantity: number; rate: number }[]) {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0)
}

export function getRemainingStock(cart: CartItem[], product: Product) {
  const cartItem = cart.find((item) => item.product.id === product.id)
  return product.stock - (cartItem?.quantity || 0)
}

export function getAppliedDiscount(item: CartItem) {
  const { discounts } = item.product
  const { quantity } = item
  let appliedDiscount = 0
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate)
    }
  }
  return appliedDiscount
}

export function isValidCoupon(coupon: Coupon) {
  return coupon.name !== "" && coupon.code !== "" && coupon.discountValue !== 0
}
