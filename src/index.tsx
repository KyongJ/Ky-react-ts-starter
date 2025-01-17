import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app';
if (module && module.hot) {
  module.hot.accept();
}
const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
root.render(<App name="Kyong" age={25} />);
