import api from "./axios";

export async function getUserAddresses(userId: string) {
  try {
    const response = await api.get(`/api/addresses/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching alamat:", error);
    throw new Error("Gagal memuat alamat. Coba lagi nanti.");
  }
}

export async function getCartData(userId: string) {
  try {
    const response = await api.get(`/api/carts/${userId}`);

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch cart data on server:", error);
    throw new Error("Gagal memuat keranjang");
  }
}

export async function getUserOrders(userId: string) {
  try {
    const response = await api.get(`/api/orders/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user order:", error);
    throw new Error("Gagal memuat riwayat pesanan. Coba lagi nanti.");
  }
}
export async function getOrderItems(orderId: string) {
  try {
    const response = await api.get(`/api/orders/order-items/${orderId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user order:", error);
    throw new Error("Gagal memuat riwayat pesanan. Coba lagi nanti.");
  }
}

export async function getProducts() {
  try {
    const response = await api.get(`/api/products`);
    return response.data.data;
  } catch (error) {
    console.error("Database Error: Failed to fetch products.", error);
    throw new Error("Gagal memuat produk. Coba lagi nanti.");
  }
}

export async function getCategories() {
  try {
    const response = await api.get(`/api/categories`);
    return response.data.data;
  } catch (error) {
    console.error("Database Error: Failed to fetch categories.", error);
    throw new Error("Gagal memuat kategori. Coba lagi nanti.");
  }
}

export async function getProductById(id: string) {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Gagal memuat product. Coba lagi nanti.");
  }
}

export async function getProductPhotos(id: string) {
  try {
    const response = await api.get(`/api/product-photos/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product photos:", error);
    throw new Error("Gagal memuat product photo. Coba lagi nanti.");
  }
}

export async function getUserData(userId: string) {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Gagal memuat data user. Coba lagi nanti.");
  }
}