// useCart.ts
import { useState } from "react"
import { CartItem, Coupon, Product } from "../../types"
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cartUtils"

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      if (existingItem) {
        return updateCartItemQuantity(prev, product.id, existingItem.quantity + 1)
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity))
  }

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
  }

  const calculateTotal = () => ({
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
