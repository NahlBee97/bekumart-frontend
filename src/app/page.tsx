"use client";

import { IUser } from "@/interfaces/authInterfaces";
import useAuthStore from "@/stores/useAuthStore";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function Home() {
  const token = getCookie("access_token") as string;
  const { user, isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (token) {
      const userData = jwtDecode<IUser>(token);
      login(userData);
    }
  }, [token, login]);

  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome back, {user?.name}!</h2>
        </div>
      ) : (
        <div>
          <h2>Please log in to access your account.</h2>
        </div>
      )}
    </div>
  );
}