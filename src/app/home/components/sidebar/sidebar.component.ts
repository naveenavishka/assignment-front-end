import { Component, OnInit } from '@angular/core';
import { LUser } from 'src/app/models/LUser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  items: any[] = [];

  
  ngOnInit() {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-home',
        items: [
          {label: 'List', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/product/list']},
          {label: 'Create', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/product/create']}
        ]
      },
      {
        label: 'sales',
        icon: 'pi pi-fw pi-home',
        items: [
          {label: 'pos', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/sales/pos']},
        ]
      },

      {
        label: 'customers',
        icon: 'pi pi-fw pi-home',
        items: [
          {label: 'List', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/customers/list']},
          {label: 'Create', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/customers/create']}
        ]
      },
    ];
  }
}
