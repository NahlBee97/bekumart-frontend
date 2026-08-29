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
        className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-shadow duration-200 focus:ring-2 focus:ring-frost focus:border-frost
                  ${
                    formik.touched[fieldName] && formik.errors[fieldName]
                      ? "border-red-400"
                      : "border-slate-200"
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