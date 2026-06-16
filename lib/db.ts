import { getRequestContext } from "@cloudflare/next-on-pages";

export function getDB() {
  const db = getRequestContext().env.DB;
  if (!db) {
    throw new Error("Cloudflare D1 is not bound or available in this environment.");
  }
  return db;
}
