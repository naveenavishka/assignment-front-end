import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthService } from '../services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';
import { SalesComponent } from './sales/sales.component';

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
            { path: '', redirectTo:"home/mc-computer-dashboard", pathMatch: 'full' },
            { path: 'mc-computer-dashboard', component: DashboardComponent, pathMatch: 'full' },
            { path: 'product', component: ProductsComponent, pathMatch: 'full' },
            { path: 'product/:component', component: ProductsComponent, pathMatch: 'full' },

            { path: 'customers', component: CustomerComponent, pathMatch: 'full' },
            { path: 'customers/:component', component: CustomerComponent, pathMatch: 'full' },


            { path: 'sales/', component: SalesComponent, pathMatch: 'full' },
            { path: 'sales/:component', component: SalesComponent, pathMatch: 'full' },
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
