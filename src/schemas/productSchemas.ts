import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short!")
    .required("Product name is required"),
  price: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  stock: Yup.number()
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  weightInKg: Yup.number()
    .min(0, "Weight cannot be negative")
    .required("Weight is required"),
  category: Yup.object()
    .shape({
      id: Yup.string().required("Please select a category"),
    })
    .required("Please select a category"),
  description: Yup.string().max(500, "Description is too long"),
});