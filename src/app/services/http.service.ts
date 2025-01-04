import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios, { AxiosError } from 'axios';
import { CustomerForm } from '../interfaces/customer-form';
import { Methods } from '../enums/methods';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  async get(uri: string) {
    const url = `${environment.apiUrl}${uri}`;
    this.logRequest(url, Methods.GET);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      this.processError(error as AxiosError);
    }
  }

  async post(uri: string, data: CustomerForm) {
    const url = `${environment.apiUrl}${uri}`;
    this.logRequest(url, Methods.POST, data);
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      this.processError(error as AxiosError);
    }
  }

  async put(uri: string, data: CustomerForm) {
    const url = `${environment.apiUrl}${uri}`;
    this.logRequest(url, Methods.PUT, data);
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      this.processError(error as AxiosError);
    }
  }

  async delete(uri: string) {
    const url = `${environment.apiUrl}${uri}`;
    this.logRequest(url, Methods.DELETE);
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      this.processError(error as AxiosError);
    }
  }

  processError(error: AxiosError) {
    console.log(error);
    if (error.status == 400) {
      // TODO: handle 400
    } else if (error.status == 422) {
      // TODO: handle 422
    } else {
      // TODO: handle other errors like 500
    }
  }

  logRequest(url: string, method: Methods, data: unknown = undefined) {
    if (!environment.production) {
      console.log(`[${method}] ${url}`, data);
    }
  }
}
