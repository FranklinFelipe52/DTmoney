import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 4000,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date('2021-02-12')
        },
        {
          id: 2,
          title: 'Transaction 2',
          amount: 1200,
          type: 'withdraw',
          category: 'casa',
          createdAt: new Date('2021-02-13')
        },
        
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transaction', ()=> {
      return this.schema.all('transaction')
    })

    this.post('/transaction', (schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
