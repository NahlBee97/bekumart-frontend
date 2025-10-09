import axios from "axios";
import { apiUrl } from "@/config";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/authInterfaces";

export async function getUserAddresses() {
  try {
    const token = (await cookies()).get("access_token")?.value as string;

    const decodedToken = jwtDecode<IUser>(token);
    const userId = decodedToken.id;
    
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
