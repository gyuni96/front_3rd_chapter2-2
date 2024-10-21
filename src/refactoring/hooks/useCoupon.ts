import { Coupon } from "../../types.ts"
import { useState } from "react"

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon])
  }

  return { coupons, addCoupon }
}
