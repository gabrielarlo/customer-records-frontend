import { Component, OnInit, signal } from '@angular/core';
import { SummaryCardComponent } from "../../templates/summary-card/summary-card.component";
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Counts } from '../../interfaces/counts';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'app-customer-list',
  imports: [SummaryCardComponent, CommonModule, FormsModule, MomentModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  counts = signal<Counts>({ 'total': 0, 'newly': 0, deleted: 0 });
  // customers = signal<Array<Customer>>([]);
  search = signal<string>('');
  search$ = toObservable(this.search).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((q) => this.getLists(q))
  );
  customers = toSignal(this.search$)

  constructor(protected customerService: CustomerService, protected router: Router) {}

  async ngOnInit() {
    await this.getCounts();
  }

  async getCounts() {
    const counts = await this.customerService.getCounts();
    this.counts.set(counts);
  }

  async getLists(q = '') {
    return await this.customerService.getCustomers(q);
  }

  editCustomer(id: string) {
    this.router.navigateByUrl(`/edit-customer/${id}`);
  }
  
}
