import { configureStore, createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist-x';

const fileReducer = createReducer(
  {
    byKey: 'init',
  },
  builder => {
    builder.addCase('addFiles', (state: any, action: any) => {
      state.byKey = 'sdfsdf';
    });
    builder.addCase('removeFiles', (state: any, action: any) => {
      state.byKey = '';
    });
  }
);

const messageReducer = createReducer(
  {
    message: {},
  },
  builder => {
    builder.addCase('addMessage', (state: any, action: any) => {
      state.message = 'sdfsdf';
    });
  }
);

const rootReducer = combineReducers({
  messageReducer,
  fileReducer,
});

const persistedReducer = persistReducer(rootReducer, {
  whiteList: ['fileReducer'],
  storageType: 'indexedDB',
});

const store = configureStore({
  reducer: persistedReducer,
});

export { store };
