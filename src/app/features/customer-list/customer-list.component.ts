import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomersService, MessageService, ConfirmationService]
})
export class CustomerListComponent {
  customers!: Customer[];

  constructor(private customersService: CustomersService, private messageService:MessageService, private confirmationService:ConfirmationService) { }

  ngOnInit() {
    this.getCustomerListAction()
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return "";
  }

  getCustomerListAction() {
    this.customersService.getCustomerList().subscribe({
      next: (response) => {
        this.customers = response
        console.log(response)
      },
      error: (error) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
      }
    })
  }

  deleteCustomer(customer:Customer){
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.customersService.deletCustomer(customer).subscribe({
          next: (response) => {
            this.getCustomerListAction()
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted!', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Failed to Delete customer!', life: 3000 });
          }
        })

      },
    });
  }
}
