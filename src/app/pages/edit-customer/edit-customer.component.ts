import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces/customer';
import { CommonModule } from '@angular/common';
import { CustomerForm } from '../../interfaces/customer-form';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'app-edit-customer',
  imports: [CommonModule, RouterLink, FormsModule, MomentModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {
  customerId = signal<string>('');
  customer = signal<Customer | undefined>(undefined);
  customerForm: CustomerForm = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  constructor(
    protected route: ActivatedRoute,
    protected customerService: CustomerService,
    protected router: Router) { 
    effect(() => {
      console.log(this.customerId());
      this.getCustomerDetails();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerId.set(params['id']);
    });
  }

  async getCustomerDetails() {
    const customer = await this.customerService.showCustomer(this.customerId());
    this.customerForm = customer;
    this.customer.set(customer);
    console.log(this.customer());
  }

  async saveCustomer() {
    const customer = await this.customerService.updateCustomer(this.customerId(), this.customerForm);
    this.customerForm = customer;
    this.customer.set(customer);
  }

  async deleteCustomer() {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      console.log('deleting');
      await this.customerService.deleteCustomer(this.customerId());
      this.router.navigateByUrl('/');
    }
  }
}
