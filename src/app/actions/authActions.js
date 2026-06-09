"use server";

import { cookies } from "next/headers";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "stimi123";

/**
 * Log in the administrator and set a secure session cookie
 */
export async function loginAction(username, password) {
  try {
    const adminUser = process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

    if (username === adminUser && password === adminPass) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "admin_session",
        value: "authenticated_stimi_yapmi_token",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day session
      });
      return { success: true };
    }

    return { success: false, error: "Username atau Password salah." };
  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat masuk." };
  }
}

/**
 * Log out the administrator by clearing the session cookie
 */
export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return { success: true };
  } catch (error) {
    console.error("Logout action error:", error);
    return { success: false, error: "Gagal mengeluarkan sesi." };
  }
}

/**
 * Check if the admin is logged in (session cookie exists)
 */
export async function checkSessionAction() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return !!session;
  } catch (error) {
    console.error("Check session error:", error);
    return false;
  }
}
