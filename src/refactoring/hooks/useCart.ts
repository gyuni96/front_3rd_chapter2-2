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
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {};

  const updateQuantity = (productId: string, newQuantity: number) => {};

  const applyCoupon = (coupon: Coupon) => {};

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
