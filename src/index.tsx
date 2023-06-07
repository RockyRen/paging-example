import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './hooks/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // 给App组件提供 Mobx的 store
  <StoreProvider>
    <App />
  </StoreProvider>
);
