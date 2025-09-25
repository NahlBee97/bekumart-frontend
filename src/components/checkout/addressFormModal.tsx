import { Form, Formik } from "formik";
import { FormInput, FormSelect } from "../formInputFields";
import { IAddresses } from "@/interfaces/addressInterface";
import { XIcon } from "lucide-react";
import { AddressSchema } from "@/schemas/addressSchema";

const AddressFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IAddresses) => void;
  initialValues: IAddresses | null;
}) => {
  if (!isOpen) return null;

  const defaultValues: IAddresses = {
    id: "",
    userId: "",
    street: "",
    subdistrict: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    latitude: null,
    longitude: null,
    isDefault: false,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <XIcon />
        </button>
        <h3 className="mb-6 text-xl font-semibold">
          {initialValues ? "Edit Address" : "Add New Address"}
        </h3>
        <Formik
          initialValues={initialValues || defaultValues}
          validationSchema={AddressSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormInput name="street" placeholder="Street address" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect name="subdistrict" placeholder="Sub District" options={MOCK_ADDRESSES}/>
                <FormSelect name="district" placeholder="District" options={MOCK_ADDRESSES} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect name="city" placeholder="City" options={MOCK_ADDRESSES} />
                <FormSelect name="province" placeholder="Province" options={MOCK_ADDRESSES} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput name="postal-code" placeholder="Postal Code" />
                <FormInput name="phone" placeholder="Phone number" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-slate-800 px-6 py-2 text-white hover:bg-slate-900 disabled:opacity-50"
              >
                {initialValues ? "Update Address" : "Save Address"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddressFormModal;