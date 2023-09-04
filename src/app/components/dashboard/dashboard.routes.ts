import { Routes } from '@angular/router';
import { StadisticsComponent } from '../income-expenses/stadistics/stadistics.component';
import { IncomeExpensesComponent } from '../income-expenses/income-expenses/income-expenses.component';
import { DetailComponent } from '../income-expenses/detail/detail.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: StadisticsComponent,
  },
  { path: 'incomes', component: IncomeExpensesComponent },
  { path: 'detail', component: DetailComponent },
];
