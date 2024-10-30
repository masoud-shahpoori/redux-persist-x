import React, { useEffect } from 'react';
import {
  isPaused,
  PAUSE_PERSIST_ACTION,
  persistReducerOptions,
  PURGE_PERSIST_ACTION,
  REHYDRATE_PERSIST_ACTION,
} from './persistReducer';
import { RehydrateSingleton } from './rehydrateSingleton';
import { Persistor } from './types';
import { storageBuilder } from './persistStorage';
import { PERSIST_STORAGE_NAME } from './persistStorage/storageInterface';
let globalStore: Persistor;
export const purgePersistReducer = () => {
  globalStore?.dispatch({ type: PURGE_PERSIST_ACTION });
};
export const pausePersistReducer = () => {
  globalStore?.dispatch({ type: PAUSE_PERSIST_ACTION });
};

function PersistWrapper({
  store,
  children,
}: {
  store: Persistor;
  children: any;
}) {
  const handleBeforeUnload = async () => {
    if (
      persistReducerOptions.whiteList?.length &&
      Object.keys(store.getState()).length > 0
    ) {
      const whiteListInStore = await persistReducerOptions.whiteList.reduce(
        (acc: any, curr: string) => {
          return {
            ...acc,
            [curr as string]: store.getState()[curr as string] as any,
          };
        },
        {}
      );
      if (!isPaused) {
        const db =
          persistReducerOptions.storage ||
          storageBuilder(persistReducerOptions.storageType || 'localStorage');
        db.setItem(PERSIST_STORAGE_NAME, whiteListInStore).then();
      }
    }
  };

  const handleInitPersistData = async () => {
    if (
      persistReducerOptions?.whiteList &&
      !RehydrateSingleton.getInstance().isRehydrateSingleton
    ) {
      RehydrateSingleton.getInstance().rehydrate(true);
      const db =
        persistReducerOptions.storage ||
        storageBuilder(persistReducerOptions.storageType || 'localStorage');

      if (
        persistReducerOptions?.expireDate &&
        persistReducerOptions?.expireDate < Date.now()
      ) {
        db.clear().then();
        return;
      }
      const res = await db.getItem(PERSIST_STORAGE_NAME);
      store.dispatch({ type: REHYDRATE_PERSIST_ACTION, payload: res });
    }
  };

  useEffect(() => {
    globalStore = store;
    handleInitPersistData().then();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <div>{children}</div>;
}

export default PersistWrapper;
