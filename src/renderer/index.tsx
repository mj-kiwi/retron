import { createRoot } from 'react-dom/client';
import App from '@/renderer/App';
import '@/renderer/i18n';
import { MainApi } from '@/preload';

// Add API key defined in contextBridge to window object type
declare global {
  interface Window {
    mainApi: MainApi;
  }
}

createRoot(document.getElementById('app')!).render(<App />);
