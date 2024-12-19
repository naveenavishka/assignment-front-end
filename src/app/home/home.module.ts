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
import { OrganizationstructureComponent } from './organizationstructure/organizationstructure.component';
import { ClusterComponent } from './organizationstructure/cluster/cluster.component';
import { MatTabsModule } from '@angular/material/tabs';
import {  TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ImportsModule } from '../utils/imports';
import { SbuComponent } from './organizationstructure/sbu/sbu.component';
import { SitesComponent } from './organizationstructure/sites/sites.component';
import { OrganizationstructureuserComponent } from './organizationstructureusers/organizationstructureusers.component';
import { SitesusersComponent } from './organizationstructureusers/sitesusers/sitesusers.component';
import { SbuusersComponent } from './organizationstructureusers/sbuusers/sbuusers.component';
import { ClusterusersComponent } from './organizationstructureusers/clusterusers/clusterusers.component';
import { HocdashboardComponent } from './hocdashboard/hocdashboard.component';
import { IncidentDashboardComponent } from './hocdashboard/incident-dashboard/incident-dashboard.component';
import { SuggestionDashboardComponent } from './hocdashboard/suggestion-dashboard/suggestion-dashboard.component';
import { SafetyWalkDashboardComponent } from './hocdashboard/safety-walk-dashboard/safety-walk-dashboard.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, SidebarComponent, OrganizationstructureComponent, OrganizationstructureuserComponent, ClusterComponent, SbuComponent, SitesComponent, SitesusersComponent, SbuusersComponent, ClusterusersComponent, HocdashboardComponent, IncidentDashboardComponent, SuggestionDashboardComponent, SafetyWalkDashboardComponent, UsermanagementComponent],
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
