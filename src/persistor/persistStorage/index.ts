import { StorageInterface } from './storageInterface';
import { LocalStoragePersistor } from './localStoragePersistor';
import { SessionStoragePersistor } from './sessionStoragePersistor';
import { DBStoragePersistor } from './DBStoragePersistor';

export type StorageType = 'localStorage' | 'sessionStorage' | 'indexedDB';

export const storageBuilder = (name: StorageType): StorageInterface => {
  const hashTable: Record<StorageType, StorageInterface> = {
    localStorage: new LocalStoragePersistor(),
    sessionStorage: new SessionStoragePersistor(),
    indexedDB: new DBStoragePersistor(),
  };

  return hashTable[name] as StorageInterface;
};
