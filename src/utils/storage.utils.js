export function getStorageItem(key, defaultValue = null, type = "local") {
  if (typeof window !== "object") return defaultValue;

  const storage = type === "local" ? localStorage : sessionStorage;

  const item = storage.getItem(key);

  if (!item) {
    setStorageItem(key, defaultValue, type);
    return defaultValue;
  }

  return JSON.parse(item);
}

export function setStorageItem(key, value, type = "local") {
  if (typeof window !== "object") return;

  const storage = type === "local" ? localStorage : sessionStorage;

  storage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key, type = "local") {
  if (typeof window !== "object") return;

  const storage = type === "local" ? localStorage : sessionStorage;

  storage.removeItem(key);
}
