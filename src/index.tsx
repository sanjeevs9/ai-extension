import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css";
import "./index.css";

const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);