export interface StorageSetDataType {
  key: string;
  value: any;
}

export const PERSIST_STORAGE_NAME = 'root:persistStorage';
export const PERSIST_STORAGE_OBJECT_KEY = 'persistStorage-cache-store';

export abstract class StorageInterface {
  abstract setItem(
    key: string,
    value: any,
    callback?: (error?: Error, result?: string) => void
  ): Promise<any>;

  abstract getItem(
    key: string,
    callback?: (error?: Error, result?: string) => void
  ): Promise<any>;

  abstract removeItem(
    key: string,
    callback?: (error?: Error) => void
  ): Promise<undefined | unknown>;

  abstract getAllKeys(
    callback?: (error?: Error, keys?: Array<string>) => void
  ): Promise<string[]> | Promise<undefined | unknown>;

  abstract clear(
    callback?: (error?: Error) => void
  ): Promise<boolean | unknown>;
}
