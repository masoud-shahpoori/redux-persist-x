# redux-persist-x

**redux-persist-x** is a lightweight persistence library for Redux with a minimal bundle size of only 4KB! It provides IndexedDB storage by default and integrates easily with other storage options. The API is designed to work seamlessly with Redux, allowing you to persist and rehydrate your Redux store with minimal setup.

## Key Features
- **Lightweight**: Only 4KB in bundle size
- **IndexedDB Storage**: Provides IndexedDB storage out-of-the-box
- **LocalStorage**: Provides LocalStorage
- **SessionStorage**: Provides sessionStorage

- **Flexible Storage Options**: Supports integration with other storage modules like `localStorage`, `sessionStorage`, or custom storage solutions
- **Easy-to-Use API**: Designed to mimic the functionality of redux-persist for a smooth migration experience

## Installation

Install **redux-persist-x** via npm or yarn:

```bash
npm install redux-persist-x
# or
yarn add redux-persist-x


```

Usage Examples:
1. [Basic Usage](#basic-usage)
2. [Nested Persists][coming soon]


#### Basic Usage
Basic usage involves adding `persistReducer` and `persistStore` to your setup.

```js
// configureStore.js

import { configureStore, createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist-x'; // defaults to localStorage for web

import rootReducer from './reducers'

const persistConfig = {
  whiteList: ["fileReducer"],
  storageType: "localStorage" //it can be localStorage,sessionStorage and indexedDB 
  //storage:, storage can be any storages(It is optional)
  expireDate:1730298664   //end of persisiting data 
}

const persistedReducer = persistReducer(rootReducer,persistConfig)

export const store = configureStore({
  reducer: persistedReducer,
});

```

If you are using react, wrap your root component with [PersistWrapper](./docs/PersistWrapper.md). This delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux. **NOTE** the `PersistGate` loading prop can be null, or any react instance, e.g. `loading={<Loading />}`

```js
import { PersistWrapper } from "redux-persist-x";


const App = () => {
  return (
    <Provider store={store}>
      <PersistWrapper  store={store}>
        <RootComponent />
      </PersistWrapper>
    </Provider>
  );
};
```
to help in that regard, wherever I can.
