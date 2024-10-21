// useCart.ts
import { useState } from "react"
import { CartItem, Coupon, Product } from "../../types"
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cartUtils"

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  /**
   * 장바구니 상품 추가
   * @param product
   */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      if (existingItem) {
        return updateCartItemQuantity(prev, product.id, existingItem.quantity + 1)
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  /**
   * 장바구니 상품 삭제
   * @param productId
   */
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  /**
   * 수량 업데이트
   * @param productId
   * @param newQuantity
   */
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity))
  }

  /**
   * 쿠폰 적용
   * @param coupon
   */
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
  }

  /**
   * 총 가격 계산
   * @returns
   */
  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon)

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  }
}
