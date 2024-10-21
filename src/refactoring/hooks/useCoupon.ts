import { Coupon } from "../../types.ts"
import { useState } from "react"

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)

  /**
   * 쿠폰 추가
   * @param coupon
   */
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon])
  }

  return { coupons, addCoupon }
}
