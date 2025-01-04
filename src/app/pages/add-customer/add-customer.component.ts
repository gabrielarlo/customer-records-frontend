import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  imports: [],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  constructor(protected router: Router) { }

  returnToList() {
    this.router.navigateByUrl('/');
  }
}
