import { tokenName } from "../config.ts";

export async function validateLogin(): Promise<number | null> {
  const encryptedToken = localStorage.getItem(tokenName);
  if (!encryptedToken) {
    return null;
  }
  try {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: encryptedToken,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/users/validation.php",
      req,
    );
    const resData = await response.text();
    if (resData === "false") {
      localStorage.removeItem(tokenName);
      return null;
    } else {
      return parseInt(resData);
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
