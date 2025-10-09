import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { apiUrl } from "@/config";
import { IUser } from "@/interfaces/authInterfaces";
import { cookies } from "next/headers";

// This function runs only on the server
export async function getCartData() {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) throw new Error("no access token");

    const userData = jwtDecode<IUser>(token);
    const userId = userData.id;

    const response = await axios.get(`${apiUrl}/api/carts/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch cart data on server:", error);
    throw new Error("Gagal memuat keranjang");
  }
}
