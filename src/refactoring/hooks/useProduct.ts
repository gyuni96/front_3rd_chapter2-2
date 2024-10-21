import { useState } from "react"
import { Product } from "../../types.ts"

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    )
  }
  const addProduct = (addProduct: Product) => {
    setProducts((prev) => [...prev, addProduct])
  }

  return { products, updateProduct, addProduct }
}
