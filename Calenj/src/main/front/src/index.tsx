import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


export const queryClient = new QueryClient( {
  defaultOptions: {
  queries: {
    staleTime: 1000 * 60, //만료시간 설정 : 60초 
    retry: 1, //query 동작 실패 시, 자동으로 몇 번만큼 retry를 시도할 지 결정하는 옵션
  },
  mutations: {
    retry: 1,
  },
},
});



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}> 
  <App />
  </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();