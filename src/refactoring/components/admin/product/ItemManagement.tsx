import AddItem from "./AddItem"
import { Product } from "../../../../types"
import ProductList from "./ProductList"

type Props = {
  products: Product[]
  onProductAdd: (newProduct: Product) => void
  onProductUpdate: (updatedProduct: Product) => void
}

const ItemManagement = ({ products, onProductAdd, onProductUpdate }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddItem onProductAdd={onProductAdd} />
      <ProductList products={products} onProductUpdate={onProductUpdate} />
    </div>
  )
}

export default ItemManagement
