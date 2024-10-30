import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { PersistWrapper } from 'redux-persist-x';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistWrapper store={store}>
      <App />
    </PersistWrapper>
  </Provider>
);
