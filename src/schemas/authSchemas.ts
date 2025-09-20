import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Nama tidak boleh kosong"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Minimal delapan karakter, setidaknya satu huruf, satu angka, dan satu karakter khusus"
    )
    .required("Password tidak boleh kosong"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Minimal delapan karakter, setidaknya satu huruf, satu angka, dan satu karakter khusus"
    )
    .required("Password tidak boleh kosong"),
});
