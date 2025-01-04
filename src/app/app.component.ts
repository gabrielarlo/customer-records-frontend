import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToasterComponent } from "./templates/toaster/toaster.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToasterComponent],
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
