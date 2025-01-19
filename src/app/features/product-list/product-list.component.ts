import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService, MessageService, ConfirmationService]
})
export class ProductListComponent {
  products!: Product[];

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getProductListAction()
  }



  getProductListAction() {
    this.productService.getProductList().subscribe({
      next: (response) => {
        this.products = response
        console.log(response)
      },
      error: (error) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
      }
    })
  }
  deleteProduct(product: Product) {
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
        this.productService.deleteProduct(product.id).subscribe({
          next: (response) => {
            this.getProductListAction()
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted!', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
          }
        })

      },
    });
  }
}
