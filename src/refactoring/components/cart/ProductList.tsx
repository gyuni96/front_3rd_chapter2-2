import { CartItem, Product } from "../../../types"
import UserProductItem from "./ProductItem"

type Props = {
  products: Product[]
  cart: CartItem[]
  handleClickAddToCart: (product: Product) => void
}

const ProductList = ({ products, cart, handleClickAddToCart }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              data-testid={`product-${product.id}`}
              className="bg-white p-3 rounded shadow"
            >
              <UserProductItem
                product={product}
                cart={cart}
                handleClickAddToCart={handleClickAddToCart}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList
