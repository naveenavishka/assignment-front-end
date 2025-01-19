import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './utilservices/auth.guard';
const routes: Routes = [
  {
    path: '', redirectTo: 'home/mc-computer-dashboard', pathMatch: 'full',
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full',canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
