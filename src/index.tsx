import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './hooks/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
