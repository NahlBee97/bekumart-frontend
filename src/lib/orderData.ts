import { apiUrl } from "@/config";
import { IUser } from "@/interfaces/authInterfaces";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserOrders() {
  try {
    const token = (await cookies()).get("access_token")?.value as string;

    const decodedToken = jwtDecode<IUser>(token);
    const userId = decodedToken.id;

    const response = await axios.get(`${apiUrl}/api/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user order:", error);
    throw new Error("Gagal memuat riwayat pesanan. Coba lagi nanti.");
  }
}
