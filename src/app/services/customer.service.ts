import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CustomerForm } from '../interfaces/customer-form';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) { }

  async getCounts() {
    return await this.httpService.get('/customers/counts');
  }

  async getCustomers(q = '') {
    return await this.httpService.get('/customers?search='+q);
  }

  async showCustomer(id: string) {
    return await this.httpService.get(`/customers/${id}`);
  }

  async createCustomer(data: CustomerForm) {
    return await this.httpService.post('/customers', data);
  }

  async updateCustomer(id: string, data: CustomerForm) {
    return await this.httpService.put(`/customers/${id}`, data);
  }

  async deleteCustomer(id: string) {
    return await this.httpService.delete(`/customers/${id}`);
  }
}
