import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'src/App';
import { createMirageServer } from 'src/services/mirage';

createMirageServer();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
