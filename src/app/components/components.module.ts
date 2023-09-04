import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses/income-expenses.component';
import { StadisticsComponent } from './income-expenses/stadistics/stadistics.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DetailComponent } from './income-expenses/detail/detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeExpensesComponent,
    StadisticsComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DetailComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeExpensesComponent,
    StadisticsComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DetailComponent,
  ],
})
export class ComponentsModule {}
