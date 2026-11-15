/**
 * A tiny async key-value store on IndexedDB. Summaries hold whole chapters and cover
 * images, which would quickly fill localStorage's few megabytes; IndexedDB has room.
 * Where IndexedDB is unavailable (some private windows), it falls back to memory,
 * so the site still works and edits simply last until the tab closes.
 */
const DB_NAME = "lom.summaries";
const STORE = "kv";

let opening: Promise<IDBDatabase | null> | null = null;
const memory = new Map<string, unknown>();

function open(): Promise<IDBDatabase | null> {
  opening ??= new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return opening;
}

function run<T>(mode: IDBTransactionMode, act: (store: IDBObjectStore) => IDBRequest): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        if (!db) return reject(new Error("IndexedDB unavailable"));
        const request = act(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
      }),
  );
}

export const keyValueStore = {
  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await run<T | undefined>("readonly", (store) => store.get(key));
    } catch {
      return memory.get(key) as T | undefined;
    }
  },
  async set(key: string, value: unknown): Promise<void> {
    try {
      await run("readwrite", (store) => store.put(value, key));
    } catch {
      memory.set(key, value);
    }
  },
  async delete(key: string): Promise<void> {
    memory.delete(key);
    try {
      await run("readwrite", (store) => store.delete(key));
    } catch {
      /* memory only */
    }
  },
  async clear(): Promise<void> {
    memory.clear();
    try {
      await run("readwrite", (store) => store.clear());
    } catch {
      /* memory only */
    }
  },
};
