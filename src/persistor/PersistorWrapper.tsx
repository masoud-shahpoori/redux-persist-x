import React, { useEffect } from 'react';
import {
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
  }, []);

  return <>{children}</>;
}

export default PersistWrapper;
