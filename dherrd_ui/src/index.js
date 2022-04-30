import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://sgtkxzhdumyo.usemoralis.com:2053/server" appId="YSRVvnhSmx5j3gUYfL4pailE0zHZQwpVGJuYoHai">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();