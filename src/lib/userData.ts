import { apiUrl } from "@/config";
import { IUser } from "@/interfaces/authInterfaces";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserData() {
  try {
    const token = (await cookies()).get("access_token")?.value as string;

    const decodedToken = jwtDecode<IUser>(token);
    const userId = decodedToken.id;

    const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Gagal memuat data user. Coba lagi nanti.");
  }
}
