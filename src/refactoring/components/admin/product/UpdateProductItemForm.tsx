import LabelInput from "./LabelInput"

type Props = {
  formData: FormDataType
  updateFormData: (key: string, value: string | number) => void
}

type FormDataType = {
  name: string
  price: number
  stock: number
}

const UpdateProductItemForm = ({ formData, updateFormData }: Props) => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <LabelInput
        label="상품명"
        id="itemName"
        type="text"
        value={formData.name}
        onChange={(e) => updateFormData("name", e.target.value)}
      />

      <LabelInput
        label="가격"
        id="productPrice"
        type="number"
        value={formData.price}
        onChange={(e) => updateFormData("price", parseInt(e.target.value))}
      />

      <LabelInput
        label="재고"
        id="productStock"
        type="number"
        value={formData.stock}
        onChange={(e) => updateFormData("stock", parseInt(e.target.value))}
      />
    </div>
  )
}

export default UpdateProductItemForm
