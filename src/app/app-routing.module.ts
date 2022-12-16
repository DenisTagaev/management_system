import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './shared/guard/guard.guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot-pass', component: ForgotPassComponent},
  {path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
