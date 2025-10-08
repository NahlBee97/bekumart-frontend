import { apiUrl } from "@/config";
import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    return response.data.data;
  } catch (error) {
    console.error("Database Error: Failed to fetch products.", error);
    throw new Error("Gagal memuat produk. Coba lagi nanti.");
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(`${apiUrl}/api/categories`);
    return response.data.data;
  } catch (error) {
    console.error("Database Error: Failed to fetch categories.", error);
    throw new Error("Gagal memuat kategori. Coba lagi nanti.");
  }
}

export async function getProductById(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/api/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Gagal memuat product. Coba lagi nanti.");
  }
}

export async function getProductPhotos(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/api/product-photos/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product photos:", error);
    throw new Error("Gagal memuat product photo. Coba lagi nanti.");
  }
}
