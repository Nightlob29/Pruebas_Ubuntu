import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ExcelComponent } from './employee-dashboard/excel/excel.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';
 
const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: EmployeeDashboardComponent, canActivate:[AuthGuard]},
  {path:'signup', component: SignupComponent},
  {path:'reportes', component: ExcelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
