import { useState } from "react"
import { Product } from "../../types.ts"

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  /**
   * 상품 업데이트
   * @param updatedProduct
   */
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    )
  }

  /**
   * 상품 추가
   * @param addProduct
   */
  const addProduct = (addProduct: Product) => {
    setProducts((prev) => [...prev, addProduct])
  }

  return { products, updateProduct, addProduct }
}
