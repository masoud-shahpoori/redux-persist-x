# redux-persist-x

**redux-persist-x** is a lightweight and efficient persistence library for Redux, designed to keep your Redux store state in sync across multiple storage options. With a tiny bundle size of just **4KB**, `redux-persist-x` makes it easy to persist and rehydrate your store while keeping your builds lean.

## Features
- **Tiny bundle size** – only **4KB**!
- **Flexible storage support** – integrates with `IndexedDB`, `localStorage`, and `sessionStorage`
- **Optimized builds** with tree-shaking and minification
- **Simple API** for easy persistence and rehydration of your Redux store

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

If you are using react, wrap your root component with PersistWrapper.

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


## API

#### `persistReducer(reducer,config)`
  - arguments
    - [**config**] *object*
      - required config: `storageType`
      - notable other config: `whitelist, expireDate, optional storage`
    - **reducer** *function*
      - any reducer will work, typically this would be the top level reducer returned by `combineReducers`
  

#### `persistor methods`
  - the persistor object is returned by persistStore with the following methods:
    - `purgePersistReducer()`
      - purges state from disk and returns a promise
    - `pausePersistReducer()`
      - pauses persistence



## Storage Engines
- **[electron storage](https://github.com/psperber/redux-persist-electron-storage)** Electron support via [electron store](https://github.com/sindresorhus/electron-store)
- **[redux-persist-cookie-storage](https://github.com/abersager/redux-persist-cookie-storage)** Cookie storage engine, works in browser and Node.js, for universal / isomorphic apps
- **[redux-persist-expo-filesystem](https://github.com/t73liu/redux-persist-expo-filesystem)** react-native, similar to redux-persist-filesystem-storage but does not require linking or ejecting CRNA/Expo app. Only available if using Expo SDK (Expo, create-react-native-app, standalone).
- **[redux-persist-expo-securestore](https://github.com/Cretezy/redux-persist-expo-securestore)** react-native, for sensitive information using Expo's SecureStore. Only available if using Expo SDK (Expo, create-react-native-app, standalone).
- **[redux-persist-fs-storage](https://github.com/leethree/redux-persist-fs-storage)** react-native-fs engine
- **[redux-persist-filesystem-storage](https://github.com/robwalkerco/redux-persist-filesystem-storage)** react-native, to mitigate storage size limitations in android ([#199](https://github.com/rt2zz/redux-persist/issues/199), [#284](https://github.com/rt2zz/redux-persist/issues/284))
  **[redux-persist-indexeddb-storage](https://github.com/machester4/redux-persist-indexeddb-storage)** recommended for web via [localForage](https://github.com/localForage/localForage)
- **[redux-persist-node-storage](https://github.com/pellejacobs/redux-persist-node-storage)** for use in nodejs environments.
- **[redux-persist-pouchdb](https://github.com/yanick/redux-persist-pouchdb)** Storage engine for PouchDB.
- **[redux-persist-sensitive-storage](https://github.com/CodingZeal/redux-persist-sensitive-storage)** react-native, for sensitive information (uses [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info)).
- **[redux-persist-weapp-storage](https://github.com/cuijiemmx/redux-casa/tree/master/packages/redux-persist-weapp-storage)** Storage engine for wechat mini program, also compatible with wepy
- **[redux-persist-webextension-storage](https://github.com/ssorallen/redux-persist-webextension-storage)** Storage engine for browser (Chrome, Firefox) web extension storage
- **[@bankify/redux-persist-realm](https://github.com/bankifyio/redux-persist-realm)** Storage engine for Realm database, you will need to install Realm first
- **custom** any conforming storage api implementing the following methods: `setItem` `getItem` `removeItem`. (**NB**: These methods must support promises)

## Community & Contributing

We welcome contributions from everyone! Whether you’re fixing bugs, suggesting new features, or improving documentation, your help is greatly appreciated. If you'd like to get involved, please feel free to open issues, create pull requests, or simply reach out to discuss ideas.

For any questions or to start a conversation, you can email me directly at [shahpoori.dev@gmail.com]. Let’s build something great together!

