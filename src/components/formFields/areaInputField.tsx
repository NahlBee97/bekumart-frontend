interface props {
  // eslint-disable-next-line
  formik: any;
  fieldName: string;
  label: string;
}

export const AreaInputField = ({ formik, fieldName, label }: props) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <textarea
        id={fieldName}
        {...formik.getFieldProps(fieldName)}
        rows={5}
        aria-describedby={
          formik.errors.fieldName ? `${fieldName}-error` : undefined
        }
        className={`w-full px-4 py-2 border rounded-md shadow-sm outline-none focus:ring focus:ring-blue-500 
                      ${
                        formik.touched.fieldName && formik.errors.fieldName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
      />
      {formik.touched.fieldName && formik.errors.fieldName && (
        <p className="mt-1 text-sm text-red-500" id={`${fieldName}-error`}>
          {formik.errors.fieldName}
        </p>
      )}
    </div>
  );
};
