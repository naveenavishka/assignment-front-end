import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OrganizationstructureComponent } from './organizationstructure/organizationstructure.component';
import { HomeComponent } from './home.component';
import { OrganizationstructureuserComponent } from './organizationstructureusers/organizationstructureusers.component';
import { HocdashboardComponent } from './hocdashboard/hocdashboard.component';
import { AuthService } from '../services/auth.service';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivateChild: [
            () => {
              const authService = inject(AuthService);
              const router = inject(Router);
      
              if (authService.isLoggedIn()) {
                return true;
              } else {
                router.navigate(['/login']);
                return false;
              }
            }
          ],
        children: [
            { path: '', redirectTo:"home/structure", pathMatch: 'full' },
            { path: 'structure', component: OrganizationstructureComponent, pathMatch: 'full' },
            { path: 'structure-users', component: OrganizationstructureuserComponent, pathMatch: 'full' },
            { path: 'hoc-dashboard', component: HocdashboardComponent, pathMatch: 'full' },
            { path: 'user-management', component: UsermanagementComponent, pathMatch: 'full' },
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
