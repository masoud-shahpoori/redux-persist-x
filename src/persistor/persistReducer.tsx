import { storageBuilder, StorageType } from './persistStorage';
import {
  PERSIST_STORAGE_NAME,
  StorageInterface,
} from './persistStorage/storageInterface';
import isEqual from 'lodash.isequal';

export type Reducer<S = any, A extends Action = Action> = (
  state: S,
  action: A
) => S;

export interface Action<T = any> {
  type: T;
}

export interface PayloadAction<P = any, T = string> extends Action<T> {
  payload: P;
}

export interface PersistReducerOptionsType {
  whiteList?: string[];
  storageType?: StorageType;
  storage?: StorageInterface;
  //should be timeStamp
  expireDate?: number;
}
export let isPaused = false;

export let persistReducerOptions: PersistReducerOptionsType = {};
export const REHYDRATE_PERSIST_ACTION = 'PERSIST/REHYDRATE';
export const PAUSE_PERSIST_ACTION = 'PERSIST/PAUSE';
export const PURGE_PERSIST_ACTION = 'PERSIST/PURGE';
export const PERSIST_ACTION = 'PERSIST/PERSIST';
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
const handlePersistData = async (store: Record<any, any>) => {
  if (
    persistReducerOptions.whiteList?.length &&
    Object.keys(store).length > 0
  ) {
    const whiteListInStore = await persistReducerOptions.whiteList.reduce(
      (acc: any, curr: string) => {
        return {
          ...acc,
          [curr as string]: store?.[curr as string] as any,
        };
      },
      {}
    );
    if (!isPaused) {
      const db =
        persistReducerOptions.storage ||
        storageBuilder(persistReducerOptions.storageType || 'localStorage');
      db.setItem(PERSIST_STORAGE_NAME, whiteListInStore).then(() => {});
    }
  }
};
export function persistReducer<S, A extends Action>(
  baseReducer: Reducer<S, A>,
  options?: PersistReducerOptionsType
): Reducer<any> {
  persistReducerOptions = options || {};
  const storage =
    options?.storage || storageBuilder(options?.storageType || 'localStorage');
  const update = debounce(state => handlePersistData(state), 500);
  let prevWhiteList = {};
  return (state, action: any) => {
    const newWhiteList = options?.whiteList?.reduce((acc: any, curr: any) => {
      return { ...acc, [curr as string]: state?.[curr as string] };
    }, {});

    if (!isEqual(newWhiteList, prevWhiteList)) {
      update(state);
    }

    prevWhiteList = newWhiteList;
    switch (action.type) {
      case REHYDRATE_PERSIST_ACTION:
        if (!isPaused && action.payload) {
          return {
            ...state,
            ...action.payload,
          };
        }
        return baseReducer(state, action);

      case PAUSE_PERSIST_ACTION:
        isPaused = true;
        return baseReducer(state, action);
      case PERSIST_ACTION:
        if (!isPaused) {
          storage.setItem(PERSIST_STORAGE_NAME, action?.payload).then();
        }
        return baseReducer(state, action);

      case PURGE_PERSIST_ACTION:
        storage.removeItem(PERSIST_STORAGE_NAME).then();
        isPaused = true;
        return baseReducer(state, action);
      default:
        return baseReducer(state, action);
    }
  };
}
