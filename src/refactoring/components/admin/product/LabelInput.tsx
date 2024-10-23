import React from "react"

type Props = {
  id: string
  label: string
  type: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LabelInput = ({ id, label, type, value, onChange }: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  )
}

export default LabelInput
