import { Product } from "../../../../types"
import ProductItem from "./ProductItem"

type Props = {
  products: Product[]
  onProductUpdate: (updatedProduct: Product) => void
}

const ProductList = ({ products, onProductUpdate }: Props) => {
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div
          key={product.id}
          data-testid={`product-${index + 1}`}
          className="bg-white p-4 rounded shadow"
        >
          <ProductItem product={product} onProductUpdate={onProductUpdate} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
