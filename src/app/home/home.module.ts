import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatCardModule} from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutingModule } from './home-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import {  TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ImportsModule } from '../utils/imports';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ComponentFactoryDirectives } from './components/directives/componentFactorydirects';
import { ProductListComponent } from '../features/product-list/product-list.component';
import { ProductCreateComponent } from '../features/product-create/product-create.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerCreateComponent } from '../features/customer-create/customer-create.component';
import { CustomerListComponent } from '../features/customer-list/customer-list.component';
import { SalesComponent } from './sales/sales.component';
import { PosUiComponent } from '../features/pos-ui/pos-ui.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, SidebarComponent,  DashboardComponent, ProductsComponent, 
    ComponentFactoryDirectives,
    ProductListComponent,
    ProductCreateComponent,
    CustomerComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    
    SalesComponent,

    PosUiComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    HomeRoutingModule,
    MatTabsModule,

    TabMenuModule,
    BadgeModule,
    TabViewModule,
    TableModule,
    ImportsModule
  ],
  exports:[
    HomeComponent
  ],
})
export class HomeModule { }
