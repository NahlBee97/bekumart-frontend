import { ILocation } from "@/interfaces/dataInterfaces";

interface props {
  // eslint-disable-next-line
  formik: any;
  fieldName: string;
  label: string;
  items: ILocation[];
  onItemChange: (itemName: string) => void;
}

export const SelectField = ({
  formik,
  fieldName,
  label,
  items,
  onItemChange
}: props) => {
  return (
    <>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={fieldName}
        {...formik.getFieldProps(fieldName)}
        onChange={(e) => onItemChange(e.target.value)}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:ring-blue-500 "
      >
        <option value="">Pilih {label}</option>
        {items.map((p) => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
      {formik.touched.fieldName && formik.errors.fieldName ? (
        <div className="text-red-500 text-sm mt-1">
          {formik.errors.fieldName}
        </div>
      ) : null}
    </>
  );
};
