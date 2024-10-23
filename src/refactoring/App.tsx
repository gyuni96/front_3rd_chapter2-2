import { CartPage } from "./pages/CartPage.tsx"
import { AdminPage } from "./pages/AdminPage.tsx"
import { useCoupons, useProducts, useAdmin } from "./hooks"
import Header from "./components/Header.tsx"
import { initialCoupons, initialProducts } from "./constants/initialData.ts"

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts)
  const { coupons, handleClickAddCoupon } = useCoupons(initialCoupons)
  const { isAdmin, handleClickToggleAdmin } = useAdmin()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={isAdmin} handleClickToggleAdmin={handleClickToggleAdmin} />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={handleClickAddCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  )
}

export default App
