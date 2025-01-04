import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios, { AxiosError } from 'axios';
import { CustomerForm } from '../interfaces/customer-form';
import { Methods } from '../enums/methods';
import { ToasterService, ToasterType } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected toasterService: ToasterService) { }

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
      this.toasterService.showToaster('Created successfully', ToasterType.SUCCESS);
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
      this.toasterService.showToaster('Updated successfully', ToasterType.SUCCESS);
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
    if (error.status == 400 || error.status == 422) {
      const message = (error.response?.data as { message: string }).message;
      this.toasterService.showToaster(message, ToasterType.ERROR);
    } else {
      this.toasterService.showToaster(error.message, ToasterType.ERROR);
    }
  }

  logRequest(url: string, method: Methods, data: unknown = undefined) {
    if (!environment.production) {
      console.log(`[${method}] ${url}`, data);
    }
  }
}
