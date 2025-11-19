import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppProvider } from "./contexts/AppContext"; 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>                         
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
