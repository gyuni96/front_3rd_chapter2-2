import { Coupon } from "../../../../types"
import CouponForm from "./CouponForm"
import CouponList from "./CouponList"

type Props = {
  coupons: Coupon[]
  onCouponAdd: (newCoupon: Coupon) => void
}

const CouponManagement = ({ coupons, onCouponAdd }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm onCouponAdd={onCouponAdd} />
        <CouponList coupons={coupons} />
      </div>
    </div>
  )
}

export default CouponManagement
