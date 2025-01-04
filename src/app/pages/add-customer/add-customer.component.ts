import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerForm } from '../../interfaces/customer-form';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  customerForm: CustomerForm = {
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    address: ''
  }

  constructor(protected router: Router, protected customerService: CustomerService) { }

  returnToList() {
    this.router.navigateByUrl('/');
  }

  async saveCustomer(withNew = false) {
    const customer = await this.customerService.createCustomer(this.customerForm);
    if (customer !== undefined) {
      if (withNew) {
        this.customerForm = {
          first_name: '',
          last_name: '',
          email: '',
          contact_number: '',
          address: ''
        }
      } else {
        this.returnToList();
      }
    }
  }
}
