import { Product } from "../../../../types"
import { useToggle } from "../../../hooks"
import ProductItemDetail from "./ProductItemDetail"

type Props = {
  product: Product
  onProductUpdate: (updatedProduct: Product) => void
}

const ProductItem = ({ product, onProductUpdate }: Props) => {
  const { openProductIds, toggleProductAccordion } = useToggle()

  return (
    <>
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIds.has(product.id) && (
        <ProductItemDetail product={product} onProductUpdate={onProductUpdate} />
      )}
    </>
  )
}

export default ProductItem
