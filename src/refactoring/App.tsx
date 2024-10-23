import { CartPage } from "./pages/CartPage.tsx"
import { AdminPage } from "./pages/AdminPage.tsx"
import { Coupon, Product } from "../types.ts"
import { useCoupons, useProducts } from "./hooks"
import Header from "./components/Header.tsx"
import { useAdmin } from "./hooks/useAdmin.ts"

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
]

const initialCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
]

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts)
  const { coupons, addCoupon } = useCoupons(initialCoupons)
  const { isAdmin, toggleAdmin } = useAdmin()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  )
}

export default App
