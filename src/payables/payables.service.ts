// payables/payables.service.ts
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class PayablesService {
  constructor(
    private readonly httpService: HttpService,

  ) {}// Injete o serviço PayablesService no construtor



  private baseUrl = 'http://localhost:8080'; // Atualize para a URL correta
  private payablesEndpoint = '/payables';


  private payables = [
    // Mock data
    /*{
      id: 'PRIMEIRA123',
      status: 'paid',
      create_date: '15/03/2020',
      subtotal: '200',
      discount: '4',
      total: '196'
    },
    {
      id: '2',
      status: 'paid',
      create_date: '15/03/2020',
      subtotal: '100',
      discount: '2',
      total: '98'
    },
    {
      id: '3',
      status: 'waiting_funds',
      create_date: '15/03/2020',
      subtotal: '100',
      discount: '2',
      total: '98'
    }*/
    // ... other payables
  ];

  /*getAllPayables() {
    console.log('entrou na rota getAllPayables do payables.service.ts', this.payables);
    return this.payables;
  }*/

  async getAllPayables(): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await this.httpService.get(`${this.baseUrl}${this.payablesEndpoint}`).toPromise();
      return response.data; // Retorna apenas os dados, sem a estrutura do Axios
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter transações da API.');
    }
  }



  
/*
  getPayableById(id: string) {
    return this.payables.find((payable) => payable.id === id);
  }*/


  async getPayableById(id: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.httpService.get(`${this.baseUrl}${this.payablesEndpoint}/${id}`).toPromise();
      return response.data; // Retorna apenas os dados da transação, sem a estrutura do Axios
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao obter transação com ID ${id} da API.`);

    }
  }


  /*createPayable(newPayable: any) {

    console.log('Antes do push: ', this.payables); // Log adicionado
    this.payables.push(newPayable);
    console.log('Depois do push: ', this.payables); // Log adicionado
    console.log('Criou um novo payable');
    return newPayable;
  }*/


  async createPayable(newTransaction: any): Promise<any> {
    try {
      // Faz a requisição POST para criar a transação na Mock API
      const response: AxiosResponse<any> = await this.httpService.post(`${this.baseUrl}${this.payablesEndpoint}`, newTransaction).toPromise();

      // Retorna a transação criada pela Mock API
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar transação na API.');
    }
  }




  /*deletePayable(id: string) {
    const index = this.payables.findIndex((payable) => payable.id === id);
    if (index !== -1) {
      const deletedPayable = this.payables.splice(index, 1);
      return { success: true, deletedPayable };
    } else {
      return { success: false, message: 'Payable not found' };
    }
  }*/


  async deletePayable(id: string): Promise<any> {
    try {
      // Faz a requisição DELETE para excluir a transação na Mock API
      const response: AxiosResponse<any> = await this.httpService.delete(`${this.baseUrl}${this.payablesEndpoint}/${id}`).toPromise();

      // Retorna os dados da transação excluída pela Mock API
      return { success: true, deletedTransaction: response.data };
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao excluir transação com ID ${id} na API.`);
    }
  }


  async calculateTotalPayablesByMerchant(startDate: string, endDate: string): Promise<any> {
    try {
      const formattedStartDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      const formattedEndDate = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

      const response: AxiosResponse<any[]> = await this.httpService.get(`${this.baseUrl}${this.payablesEndpoint}`).toPromise();
      const payables = response.data.filter(
        (payable) =>
          moment(payable.create_date, 'DD/MM/YYYY').isBetween(formattedStartDate, formattedEndDate, 'days', '[]'),
      );

      const totalPaid = payables
        .filter((payable) => payable.status === 'paid')
        .reduce((total, payable) => total + parseFloat(payable.total), 0);

      const totalFee = payables
        .filter((payable) => payable.status === 'paid')
        .reduce((total, payable) => total + parseFloat(payable.discount), 0);

      const totalToReceive = payables
        .filter((payable) => payable.status === 'waiting_funds')
        .reduce((total, payable) => total + parseFloat(payable.total), 0);

      console.log("entrou na funcao calculateTotalPayablesByMerchant")
      console.log('LOG-TIAGO:::> Retorno' + totalPaid.toFixed(2) + totalFee.toFixed(2) + totalToReceive.toFixed(2));

      return {
        totalPaid: totalPaid.toFixed(2),
        totalFee: totalFee.toFixed(2),
        totalToReceive: totalToReceive.toFixed(2),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao calcular totais de payables.');
    }
  }



  
}
