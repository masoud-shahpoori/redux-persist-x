import {
  PERSIST_STORAGE_OBJECT_KEY,
  StorageInterface,
} from './storageInterface';
import { DBStorageSingleton } from './DBStorageSingleton';

export class DBStoragePersistor implements StorageInterface {
  private db: IDBDatabase | null = null;
  private dbReady: Promise<void>;

  constructor() {
    this.dbReady = (async () => {
      const dbInstance = await DBStorageSingleton.getInstance();
      this.db = dbInstance.db;
    })();
  }

  async setItem(
    key: string,
    value: any,
    callback?: (error?: Error, result?: string) => void
  ): Promise<any> {
    await this.dbReady;

    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        PERSIST_STORAGE_OBJECT_KEY,
        'readwrite'
      );
      const store = transaction.objectStore(PERSIST_STORAGE_OBJECT_KEY);
      const request = store.put(value, key);

      request.onsuccess = () => {
        callback?.(undefined, JSON.stringify(value));
        resolve(value);
      };

      request.onerror = () => {
        console.error(`Error setting data with key ${key}:`, request.error);
        callback?.(request.error as any);
        reject(request.error);
      };
    });
  }

  async getItem(
    key: string,
    callback?: (error?: Error, result?: string) => void
  ): Promise<any> {
    await this.dbReady;

    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        PERSIST_STORAGE_OBJECT_KEY,
        'readonly'
      );
      const store = transaction.objectStore(PERSIST_STORAGE_OBJECT_KEY);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        callback?.(undefined, JSON.stringify(result));
        resolve(result);
      };

      request.onerror = () => {
        callback?.(request.error as any);
        reject(request.error);
      };
    });
  }

  async removeItem(
    key: string,
    callback?: (error?: Error) => void
  ): Promise<undefined | unknown> {
    await this.dbReady;

    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        PERSIST_STORAGE_OBJECT_KEY,
        'readwrite'
      );
      const store = transaction.objectStore(PERSIST_STORAGE_OBJECT_KEY);
      const request = store.delete(key);

      request.onsuccess = () => {
        callback?.(key as any);
        resolve(undefined);
      };

      request.onerror = () => {
        callback?.(request.error as any);
        reject(request.error);
      };
    });
  }

  async getAllKeys(
    callback?: (error?: Error, keys?: Array<string>) => void
  ): Promise<string[] | unknown> {
    await this.dbReady;

    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        PERSIST_STORAGE_OBJECT_KEY,
        'readonly'
      );
      const store = transaction.objectStore(PERSIST_STORAGE_OBJECT_KEY);
      const keysRequest = store.getAllKeys();

      keysRequest.onsuccess = () => {
        const keys = keysRequest.result as string[];
        callback?.(undefined, keys);
        resolve(keys);
      };

      keysRequest.onerror = () => {
        callback?.(keysRequest.error as any);
        reject(keysRequest.error);
      };
    });
  }

  async clear(callback?: (error?: Error) => void): Promise<boolean | unknown> {
    await this.dbReady;

    if (!this.db) throw new Error('Database not initialized');
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        PERSIST_STORAGE_OBJECT_KEY,
        'readwrite'
      );
      const store = transaction.objectStore(PERSIST_STORAGE_OBJECT_KEY);
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        callback?.();
        resolve(true);
      };

      clearRequest.onerror = () => {
        callback?.(clearRequest.error as any);
        reject(clearRequest.error);
      };
    });
  }
}
