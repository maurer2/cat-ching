import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppContainer from './components/AppContainer';

const container = document.querySelector('#root');
if (!container) {
  throw new Error('root element can\'t be found');
}

const root = createRoot(container);
root.render(<AppContainer />);
