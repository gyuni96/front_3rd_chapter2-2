// useCart.ts
import { CartItem, Coupon, Product } from "../../types"
import { calculateCartTotal, getRemainingStock, updateCartItemQuantity } from "./utils/cartUtils"
import { useLocalStorage } from "./useLocalStorage"

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("shopping-cart", [])
  const [selectedCoupon, setSelectedCoupon] = useLocalStorage<Coupon | null>(
    "selected-coupon",
    null
  )

  /**
   * 장바구니 상품 추가
   * @param product
   */
  const handleClickAddToCart = (product: Product) => {
    const remainingStock = getRemainingStock(cart, product)
    if (remainingStock <= 0) return

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
  const handleClickRemoveCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  /**
   * 수량 업데이트
   * @param productId
   * @param newQuantity
   */
  const handleClickUpdateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity))
  }

  /**
   * 쿠폰 적용
   * @param coupon
   */
  const handleChangeCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
  }

  /**
   * 총 가격 계산
   * @returns
   */
  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon)

  return {
    cart,
    handleClickAddToCart,
    handleClickRemoveCart,
    handleClickUpdateQuantity,
    handleChangeCoupon,
    calculateTotal,
    selectedCoupon,
  }
}
