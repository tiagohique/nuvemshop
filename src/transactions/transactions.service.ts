// transactions/transactions.service.ts
import { Injectable } from '@nestjs/common';
import { PayablesService } from '../payables/payables.service'; // Importe o serviço PayablesService
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class TransactionsService {
  constructor(
    private readonly payablesService: PayablesService,
    private readonly httpService: HttpService,
  ) {}// Injete o serviço PayablesService no construtor
  
  private apiBaseUrl = 'http://localhost:8080'; // Atualize para a URL correta
  private transactionsEndpoint = '/transactions';
  


  private transactions = [
    // Mock data
    /*{
      id: 'PRIMEIRA123',
      value: '340.30',
      description: 'T-Shirt Black/M',
      method: 'debit_card',
      cardNumber: '3486',
      cardHolderName: 'Fonsi Julian',
      cardExpirationDate: '04/28',
      cardCvv: '290',
    }
    ,
    {
        id: 'KiV2sSDF',
        value: '344.30',
        description: 'Calca M',
        method: 'credit_card',
        cardNumber: '3432',
        cardHolderName: 'Felipe Lima',
        cardExpirationDate: '04/25',
        cardCvv: '292',
      },
      {
        id: 'RgV2szQ',
        value: '40.30',
        description: 'Brinco Black/M',
        method: 'credit_card',
        cardNumber: '3553',
        cardHolderName: 'Tiago Luiz',
        cardExpirationDate: '04/33',
        cardCvv: '244',
      },*/
    // ... other transactions
  ];

  getAllTransactions() {
   
    return this.transactions;
    // return this.transactions;
  }

  getTransactionById(id: string) {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  createTransaction(newTransaction: any) {
    console.log('LOG-TIAGO:::>  Entrou no create Transaction');
    this.transactions.push(newTransaction);
    this.processTransaction(newTransaction);
    return newTransaction;
  }

  deleteTransaction(id: string) {
    //console.log('chegou o parametro no delete ' + id)
    const index = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );
    if (index !== -1) {
      const deletedTransaction = this.transactions.splice(index, 1);
      return { success: true, deletedTransaction };
    } else {
      return { success: false, message: 'Transaction not found' };
    }
  }
  
  processTransaction(transaction: any) {
    console.log('LOG-TIAGO:::>  Entrou na processTransaction');
    // Lógica para processar transações
    const payable = this.calculatePayable(transaction);
    this.payablesService.createPayable(payable); // Use o serviço PayablesService para criar o payable
    // Retornar a transação processada
    return transaction;
  }

  private calculatePayable(transaction: any) {
    console.log('LOG-TIAGO:::>  Entrou no calculatePayable');
    if (transaction.method === 'debit_card'){

    }
    const fee = transaction.method === 'debit_card' ? 0.02 : 0.04;
    const totalAmount = parseFloat(transaction.value);
    const discountedAmount = totalAmount * (1 - fee);

    const payable = {
      id: transaction.id,
      status: transaction.method === 'debit_card' ? 'paid' : 'waiting_funds',
      create_date: transaction.method === 'debit_card' ? moment().format('DD/MM/YYYY'): moment().add(30, 'days').format('DD/MM/YYYY'),
      //create_date: moment().format('DD/MM/YYYY'),
      subtotal: transaction.value,
      discount: (totalAmount - discountedAmount).toFixed(2),
      total: discountedAmount.toFixed(2),
    };
    
    return payable;
  }
}
