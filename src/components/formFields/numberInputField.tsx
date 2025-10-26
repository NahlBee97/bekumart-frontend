interface props {
  // eslint-disable-next-line
  formik: any;
  fieldName: string;
  withLabel: boolean;
  label: string;
  placeHolder: string;
  min: number;
}

export const NumberInputField = ({
  formik,
  fieldName,
  label,
  placeHolder,
  withLabel,
  min,
}: props) => {
  return (
    <>
      <label
        htmlFor={fieldName}
        className={`${
          withLabel ? "block" : "hidden"
        } text-sm font-medium text-gray-700 mb-2`}
      >
        {label}
      </label>
      <input
        type="number"
        id={fieldName}
        {...formik.getFieldProps(fieldName)}
        placeholder={placeHolder}
        required
        min={min}
        className="form-input"
      />
    </>
  );
};
