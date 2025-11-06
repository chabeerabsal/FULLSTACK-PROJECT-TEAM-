import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink],
  template: `
  <nav>
  <a routerLink="/dashboard">Dashboard</a>|
 <a routerLink="/invoices">Inovices</a>|
  <a routerLink="/expenses">Expenses</a>|
  <a routerLink="/reports">Reports</a>
  </nav>
  <router-outlet></router-outlet>
  `,
   
 
})
export class App {
 






















































































































































   


}
