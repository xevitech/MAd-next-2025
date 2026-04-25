import { decryptData } from "./crypto-reusable";

export function getDecryptedUser(): any | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("userData");
  if (!stored) return {};
  try {
    const decrypted = decryptData(stored);
    if (!decrypted) return null;
    // decryptData may return a JSON string or an object
    if (typeof decrypted === "string") {
      try {
        return JSON.parse(decrypted);
      } catch (e) {
        // not JSON — return raw string
        return decrypted as any;
      }
    }
    return decrypted as any;
  } catch (err) {
    return null;
  }
}

export function getDecryptedUserId(): string | null {
  const user = getDecryptedUser();
  if (user && typeof user === "object" && "id" in user) return user.id;
  return null;
}

export function getDecryptedOrgId(): any | null {
  return decryptData(localStorage.getItem("active_org")) ?? null;
}
