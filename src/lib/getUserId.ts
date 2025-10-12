import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserId() {
  const token = (await cookies()).get("token")?.value as string;

  const decodedToken = jwtDecode<{ id: string }>(token);
  return decodedToken.id;
}
