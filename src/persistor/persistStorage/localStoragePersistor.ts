import { StorageInterface } from './storageInterface';

export class LocalStoragePersistor implements StorageInterface {
  setItem(
    key: string,
    value: undefined,
    callback: (error?: Error, result?: string) => void
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        callback(undefined, value);
        resolve(value);
      } catch (error) {
        callback(error as any);
        reject(error);
      }
    });
  }
  getItem(
    key: string,
    callback: (error?: Error, result?: string) => void
  ): Promise<any> {
    try {
      const data = localStorage.getItem(key);
      callback?.(JSON.parse(data as string));
      return Promise.resolve(JSON.parse(data as string));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  removeItem(
    key: string,
    callback?: (error?: Error) => void
  ): Promise<undefined> {
    try {
      localStorage.removeItem(key);
      return Promise.resolve(undefined);
    } catch (error) {
      callback?.(error as any);
      return Promise.reject(error);
    }
  }
  getAllKeys(
    callback?: (error?: Error, keys?: Array<string>) => void
  ): Promise<string[]> | Promise<undefined> {
    try {
      const keys = Object.keys(localStorage);
      callback?.(undefined, keys);

      return Promise.resolve(undefined);
    } catch (error) {
      callback?.(error as Error);
      return Promise.reject(error) as Promise<any>;
    }
  }
  clear(callback?: (error?: Error) => void): Promise<boolean> {
    try {
      localStorage.clear();
      return Promise.resolve(true);
    } catch (error) {
      callback?.(error as any);
      return Promise.reject(error);
    }
  }
}
