import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n from './i18n/config';

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <App />
      </React.Suspense>
    </React.StrictMode>
  );
};

// Wait for i18n to be initialized before rendering
if (i18n.isInitialized) {
  renderApp();
} else {
  i18n.on('initialized', renderApp);
}
