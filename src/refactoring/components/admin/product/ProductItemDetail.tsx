import { Product } from "../../../../types"
import DiscountList from "./DiscountList"
import UpdateProductItemForm from "./UpdateProductItemForm"
import { useUpdateProductForm } from "../../../hooks"

type Props = {
  product: Product
  onProductUpdate: (updatedProduct: Product) => void
}

const ProductItemDetail = ({ product, onProductUpdate }: Props) => {
  const { isEdit, formData, updateFormData, completeModify, toggleEditMode } = useUpdateProductForm(
    product,
    onProductUpdate
  )

  return (
    <>
      {isEdit ? (
        <UpdateProductItemForm formData={formData} updateFormData={updateFormData} />
      ) : null}
      <DiscountList product={product} isEdit={isEdit} onProductUpdate={onProductUpdate} />
      {isEdit ? (
        <button
          onClick={completeModify}
          className="text-white px-2 py-1 rounded bg-green-500 hover:bg-green-600 mt-2"
        >
          수정 완료
        </button>
      ) : (
        <button
          onClick={toggleEditMode}
          data-testid="modify-button"
          className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 mt-2"
        >
          수정
        </button>
      )}
    </>
  )
}

export default ProductItemDetail
