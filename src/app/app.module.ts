import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
// import { ToeknInterceptor } from './utilservices/token.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
// import { PosUiComponent } from './features/pos-ui/pos-ui.component';
// import { CustomerListComponent } from './features/customer-list/customer-list.component';
// import { CustomerCreateComponent } from './features/customer-create/customer-create.component';
// import { ProductListComponent } from './features/product-list/product-list.component';
// import { ProductCreateComponent } from './features/product-create/product-create.component';

@NgModule({
  declarations: [
    AppComponent,
    // PosUiComponent,

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    ToastModule
  ],
  providers: [
    // {provide:HTTP_INTERCEPTORS, useClass:ToeknInterceptor, multi:true},
    MessageService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
