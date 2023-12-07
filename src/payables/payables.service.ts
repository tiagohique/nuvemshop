// payables/payables.service.ts
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class PayablesService {
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

  getAllPayables() {
    console.log('entrou na rota getAllPayables do payables.service.ts', this.payables);
    return this.payables;
  }

  getPayableById(id: string) {
    return this.payables.find((payable) => payable.id === id);
  }

  createPayable(newPayable: any) {

    console.log('Antes do push: ', this.payables); // Log adicionado
    this.payables.push(newPayable);
    console.log('Depois do push: ', this.payables); // Log adicionado
    console.log('Criou um novo payable');
    return newPayable;
  }

  deletePayable(id: string) {
    const index = this.payables.findIndex((payable) => payable.id === id);
    if (index !== -1) {
      const deletedPayable = this.payables.splice(index, 1);
      return { success: true, deletedPayable };
    } else {
      return { success: false, message: 'Payable not found' };
    }
  }


  calculateTotalPayablesByMerchant(startDate: string, endDate: string) {
    console.log("entrou na função calculateTotalPayablesByMerchant");
    console.log(startDate);
    console.log(endDate);
    console.log("payables:", this.payables);

    //const payables = this.payables;
    
    //const payables = this.payables.filter(
     // (payable) =>
        //moment(payable.create_date, 'DD/MM/YYYY').isBetween(startDate, endDate, 'days', '[]'),
    //);
    
    const formattedStartDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const payables = this.payables.filter(
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
  }



  
}
