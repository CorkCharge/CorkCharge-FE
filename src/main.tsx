//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './shared/styles/global.css';
import 'rc-slider/assets/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false, // 탭 복귀 시 재요청 X
    },
  },
});

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  //</StrictMode>
);
