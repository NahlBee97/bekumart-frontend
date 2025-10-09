import axios from "axios";
import { apiUrl } from "@/config";
import { cookies } from "next/headers";

export async function getAddressByUserId(userId: string) {
  try {
    const token = (await cookies()).get("access_token")?.value as string;

    const response = await axios.get(`${apiUrl}/api/addresses/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching alamat:", error);
    throw new Error("Gagal memuat alamat. Coba lagi nanti.");
  }
}
