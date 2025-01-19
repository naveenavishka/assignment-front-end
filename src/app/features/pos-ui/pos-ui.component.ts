import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { saleDetailsModel } from 'src/app/models/saleDetails.model';
import { SalesModel } from 'src/app/models/sales1.model';
import { CustomersService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-pos-ui',
  templateUrl: './pos-ui.component.html',
  styleUrls: ['./pos-ui.component.css'],
  providers: [ProductService, MessageService,SalesService, CustomersService]
})
export class PosUiComponent {
  products!: Product[];
  productCart: saleDetailsModel[] = [];
  customers:Customer[] = []
  selectedCustomer: number | null = null;
  saleDetails!: SalesModel;
  discountModal: boolean = false
  paymentModel: boolean = false
  discountValue: number = 0
  customerPaid: number = 0

  constructor(private productService: ProductService, private messageService: MessageService, private salesService: SalesService, private customersService:CustomersService) { }

  ngOnInit() {
    this.getProductListAction()
    this.getCustomerList()
  }

  getCustomerList() {
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
  addProduct(product: Product) {
    const alreadyadded = this.productCart.findIndex(item => item.ProductId == product.id)
    if (alreadyadded >= 0) {
      const currentPro = this.productCart[alreadyadded]
      currentPro.Qty = currentPro.Qty + 1
      currentPro.Total = (currentPro.PriceItem ?? 0) * currentPro.Qty

      this.productCart[alreadyadded] = currentPro
    } else {
      const sale: saleDetailsModel = {
        SalesId: 0,
        ProductId: product.id,
        Qty: 1,
        PriceItem: product.sellingPrice,
        Total: product.sellingPrice
      };
      this.productCart.push(sale)
    }
    console.log(this.productCart)
  }

  getProductDetails(productID: number) {
    return this.products.find(item => item.id == productID)
  }

  productQTYSET(product: saleDetailsModel, type: String) {
    const incrementingProductIndex = this.productCart.findIndex(item => item.ProductId == product.ProductId)

    if (incrementingProductIndex < 0) { return }
    const currentPro = this.productCart[incrementingProductIndex]
    console.log(product)
    switch (type) {
      case "minus":
        if (currentPro.Qty - 1 < 1) {
          this.productCart = this.productCart.filter(item => item.ProductId !== product.ProductId)
          return
        }
        currentPro.Qty = currentPro.Qty - 1
        break;
      case "plus":
        currentPro.Qty = currentPro.Qty + 1
        break;
      default:
        break;
    }

    currentPro.Total = (currentPro.PriceItem ?? 0) * currentPro.Qty
    this.productCart[incrementingProductIndex] = currentPro
  }

  getTotal() {
    return this.productCart.reduce((acc, product) => {
      return acc + (product.Total ?? 0);
    }, 0);
  }

  getFinalTOtal() {
    return this.getTotal() - (this.getTotal() * (this.discountValue / 100))
  }

  getCustomer(customerid:number) {
    return this.customers.find(item=>item.id == customerid)
  }

  saveSale() {
    const saleDetail: SalesModel = {
      discountPercentage: this.discountValue,
      discount: (this.getTotal() * (this.discountValue / 100)),
      total: this.getTotal(),
      paid: this.customerPaid,
      balance: this.getFinalTOtal(),
      CustomerId:this.selectedCustomer ?? 0
    }

    this.salesService.createSale(saleDetail).subscribe({
      next: (response) => {
        if(response.id>0){
          this.productCart = this.productCart.map(product => ({
            ...product,
            SalesId: response.id
          }));
          console.log()
          this.saleDetails = response 
          
          this.salesService.createSaleDetails(this.productCart).subscribe({
            next: (response) => {
              this.print()
            },
            error: (error) => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
            }
            
          })
        }
      },
      error: (error) => {
        
      }
    })
  }


  print(): void {
    const printContent = document.getElementById('print-section')?.innerHTML;

    if (printContent) {
      const printWindow = window.open('', '', 'height=600,width=800');

      if (printWindow) {
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<link rel="stylesheet" href="/style.css">');
        printWindow.document.write('<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');

        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.print();
          printWindow.close(); 
        };
      }
    } 
  }
  cancel(){
    this.productCart = []
  }
}
// Scaffold-DbContext "Server=localhost\SQLEXPRESS;Database=assignment;User Id=sa;Password=Admin@123;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables Sale -Force