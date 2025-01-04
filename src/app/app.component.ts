import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customer-records-frontend';

  constructor(protected router: Router) { }

  addCustomer() {
    this.router.navigateByUrl('/add-customer');
  }
}
