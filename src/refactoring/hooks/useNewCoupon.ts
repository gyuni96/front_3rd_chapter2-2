import { useState } from "react"
import { Coupon } from "../../types"
import { updateValue } from "./utils/commonUtils"

type Props = {
  onCouponAdd: (newCoupon: Coupon) => void
}

export const useNewCoupon = ({ onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  })

  /**
   * 새로운 쿠폰 업데이트
   * @param key
   * @param value
   */
  const updateNewCoupon = <K extends keyof Coupon>(key: K, value: Coupon[K]) => {
    setNewCoupon((prev) => updateValue(prev, key, value))
  }

  /**
   * 쿠폰 추가
   */
  const handleAddCoupon = () => {
    onCouponAdd(newCoupon)
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    })
  }

  return { newCoupon, updateNewCoupon, handleAddCoupon }
}
