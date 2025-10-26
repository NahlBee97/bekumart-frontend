import * as Yup from "yup";

export const UpdateProfileSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Alamat email tidak valid"),
});
