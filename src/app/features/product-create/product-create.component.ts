import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [ProductService]
})
export class ProductCreateComponent {
  productCreateForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private messageService: MessageService) {


    this.productCreateForm = this.fb.group({
      ProductName: ['', [Validators.required, Validators.minLength(3)]],
      PurchasePrice: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      SellingPrice: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  ngOnInit(): void { }

  get f() {
    return this.productCreateForm.controls;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(): void {
    if (this.productCreateForm.invalid) {
      return;
    }

    console.log(this.productCreateForm.value);
    this.productService.createProduct(this.productCreateForm.value).subscribe({
      next: (response) => {
        const formData = new FormData();
        console.log(response)
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
          formData.append('productID', response.id);

          this.productService.uploadproductImage(formData).subscribe({
            next: (response) => {

            },
            error: (error) => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
            }
          })
        }


        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Addeed!', life: 3000 });
      },
      error: (error) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
      }
    })
  }
}
