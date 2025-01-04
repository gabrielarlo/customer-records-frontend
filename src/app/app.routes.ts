import { Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';

export const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent,
    },
    {
        path: 'add-customer',
        component: AddCustomerComponent,
    },
    {
        path: 'edit-customer/:id',
        component: EditCustomerComponent,
    },
];
