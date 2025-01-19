import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomersService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
  providers: [CustomersService]
})
export class CustomerCreateComponent {
  productCreateForm!: FormGroup;


  constructor(private fb: FormBuilder, private customerService: CustomersService, private messageService:MessageService) {


    this.productCreateForm = this.fb.group({
      CustomerName: ['', [Validators.required, Validators.minLength(3)]],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      CustomerEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void { }

  get f() {
    return this.productCreateForm.controls;
  }

  onSubmit(): void {
    if (this.productCreateForm.invalid) {
      return;  
    }

    console.log(this.productCreateForm.value);
    this.customerService.createCustomer(this.productCreateForm.value).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Addeed!', life: 3000 });
      },
      error: (error) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to add Product!', life: 3000 });
      }
    })
  }
}
