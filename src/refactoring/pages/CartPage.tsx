import { Coupon, Product } from "../../types.ts"
import CouponSelect from "../components/cart/CouponSelect.tsx"
import ProductList from "../components/cart/ProductList.tsx"
import UserCartItem from "../components/cart/CartItem.tsx"
import UserCartTotal from "../components/cart/CartTotal.tsx"
import { useCart } from "../hooks/index.ts"

interface Props {
  products: Product[]
  coupons: Coupon[]
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    handleClickAddToCart,
    handleClickRemoveCart,
    handleClickUpdateQuantity,
    handleChangeCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart()

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} cart={cart} handleClickAddToCart={handleClickAddToCart} />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center bg-white p-3 rounded shadow"
                >
                  <UserCartItem
                    item={item}
                    handleClickUpdateQuantity={handleClickUpdateQuantity}
                    handleClickRemoveCart={handleClickRemoveCart}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <CouponSelect coupons={coupons} handleChangeCoupon={handleChangeCoupon} />
            {selectedCoupon && (
              <p className="text-green-600">
                적용된 쿠폰: {selectedCoupon.name}(
                {selectedCoupon.discountType === "amount"
                  ? `${selectedCoupon.discountValue}원`
                  : `${selectedCoupon.discountValue}% 할인`}
                )
              </p>
            )}
          </div>

          <UserCartTotal
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </div>
    </div>
  )
}
