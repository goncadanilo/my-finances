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
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          transactionType: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-02-08 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          transactionType: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2022-02-12 12:00:00'),
        },
      ],
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
