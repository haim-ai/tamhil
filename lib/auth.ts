// Demo lock only: a static site has no server, so anyone who reads the code can get past it.
// A real panel sits behind a server login (Cloudflare Access / Supabase Auth). The password itself is not in the code, only its hash.
const HASH = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
const KEY = "tamhil.admin";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function login(password: string) {
  const ok = (await sha256(password)) === HASH;
  if (ok) sessionStorage.setItem(KEY, "1");
  return ok;
}

export const isIn = () => sessionStorage.getItem(KEY) === "1";
export const logout = () => sessionStorage.removeItem(KEY);
