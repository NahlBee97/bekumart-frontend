import { ErrorMessage, Field } from "formik";
const FormInput = ({
  name,
  placeholder,
  type = "text",
}: {
  name: string;
  placeholder: string;
  type?: string;
}) => (
  <div>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-sm text-red-600"
    />
  </div>
);

const FormSelect = ({
  name,
  placeholder,
  options,
}: {
  name: string;
  placeholder: string;
  options: { id: string; name: string }[];
}) => (
  <div>
    <Field
      as="select"
      name={name}
      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500 transition-colors duration-200 ease-in-out"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-sm text-red-600"
    />
  </div>
);

export { FormSelect, FormInput };
