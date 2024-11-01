import { StorageInterface } from './storageInterface';
import { LocalStoragePersistor } from './localStoragePersistor';
import { SessionStoragePersistor } from './sessionStoragePersistor';
import { DBStoragePersistor } from './DBStoragePersistor';

export type StorageType = 'localStorage' | 'sessionStorage' | 'indexedDB';

export const storageBuilder = (name: StorageType): StorageInterface => {
  if (name === 'indexedDB') {
    return new DBStoragePersistor();
  } else if (name === 'sessionStorage') {
    return new SessionStoragePersistor();
  }

  return new LocalStoragePersistor();
};
