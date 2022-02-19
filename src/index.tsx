import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transactions');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transactions', data);
    });

    this.put('/transactions/:id', (schema, request): any => {
      const { id } = request.params;
      const data = JSON.parse(request.requestBody);
      return schema.find('transactions', id)?.update(data);
    });

    this.delete('/transactions/:id', (schema, request) => {
      const { id } = request.params;
      return schema.where('transactions', { id }).destroy();
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
