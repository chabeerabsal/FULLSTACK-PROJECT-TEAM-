import { Routes } from '@angular/router';
import {Dashboard} from './components/dashboard/dashboard';
import {Invoices} from './components/invoices/invoices';
import {Expenses} from './components/expenses/expenses';
import {Reports} from './components/reports/reports';
 
export const routes: Routes = [
    {path:'',redirectTo:'/dashboard', pathMatch:'full'},
    {path:'dashboard',component:Dashboard},
    {path:'invoices',component:Invoices},
    {path:'expenses',component:Expenses},
    {path:'reports',component:Reports}
    
];
