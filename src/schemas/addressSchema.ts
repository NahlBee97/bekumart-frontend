import * as Yup from "yup";

export const AddressSchema = Yup.object().shape({
  street: Yup.string().required("Street address is required"),
  subdistrict: Yup.string().required("Sub District is required"),
  district: Yup.string().required("District is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("State / Province is required"),
  postalCode: Yup.string().required("ZIP / Postal code is required"),
  phone: Yup.string().required("Phone number is required"),
});
