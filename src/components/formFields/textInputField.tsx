interface props {
  // eslint-disable-next-line
  formik: any;
  type: string;
  fieldName: string;
  withLabel: boolean;
  label: string;
  placeHolder: string;
}

export const TextInputField = ({
  formik,
  type,
  fieldName,
  label,
  placeHolder,
  withLabel,
}: props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={fieldName}
        className={`${
          withLabel ? "block" : "hidden"
        } text-sm font-medium text-gray-700 mb-2`}
      >
        {label}
      </label>
      <input
        type={type}
        id={fieldName}
        placeholder={placeHolder}
        {...formik.getFieldProps(fieldName)}
        aria-describedby={
          formik.errors[fieldName] ? `${fieldName}-error` : undefined
        }
        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500 
                  ${
                    formik.touched[fieldName] && formik.errors[fieldName]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className="mt-1 text-sm text-red-500" id={`${fieldName}-error`}>
          {formik.errors[fieldName]}
        </p>
      )}
    </div>
  );
};