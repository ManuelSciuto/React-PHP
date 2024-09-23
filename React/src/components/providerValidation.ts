import { fornitoreTokenName } from "../config.ts";

export async function providerValidateLogin(): Promise<{
  id_provider: number;
  name: string;
} | null> {
  const encryptedToken = localStorage.getItem(fornitoreTokenName);
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
      "http://localhost:8000/providerValidation.php",
      req
    );
    const resData = await response.json();
    if (resData === "false") {
      localStorage.removeItem(fornitoreTokenName);
      return null;
    } else {
      return resData;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
