import {
  PERSIST_STORAGE_NAME,
  PERSIST_STORAGE_OBJECT_KEY,
} from './storageInterface';

export class DBStorageSingleton {
  private static instance: DBStorageSingleton;
  public db: IDBDatabase | null = null;
  private dbReady: Promise<void> | undefined;

  private constructor() {
    if (!this.db) this.dbReady = this.initPersistDb();
  }

  public static async getInstance(): Promise<DBStorageSingleton> {
    if (!DBStorageSingleton.instance) {
      DBStorageSingleton.instance = new DBStorageSingleton();
    }
    await DBStorageSingleton.instance.dbReady;
    return DBStorageSingleton.instance;
  }

  private async initPersistDb(): Promise<void | unknown> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(PERSIST_STORAGE_NAME, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(PERSIST_STORAGE_OBJECT_KEY)) {
          db.createObjectStore(PERSIST_STORAGE_OBJECT_KEY);
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => {
        console.error('Database initialization error:', request.error);
        reject(request.error);
      };
    });
  }
}
