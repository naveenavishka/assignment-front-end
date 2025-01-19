import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ComponentFactoryDirectives } from '../components/directives/componentFactorydirects';
import { ActivatedRoute } from '@angular/router';
import { CustomerCreateComponent } from 'src/app/features/customer-create/customer-create.component';
import { CustomerListComponent } from 'src/app/features/customer-list/customer-list.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  @ViewChild(ComponentFactoryDirectives, { static: true }) ComponentFDirective!: ComponentFactoryDirectives


  constructor(private componentFactoryResolver: ComponentFactoryResolver, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // const varActivatedPath = this.route.pathFromRoot[3].snapshot.url[0].path;

    // console.log(this.route.pathFromRoot[3].snapshot.url[0].path)

    this.route.params.subscribe((params) => {
      const componentName = params['component'];
      console.log(componentName)
      this.loadComponents(componentName);
    });
  }

  loadComponents(varActivatedPath: String) {
    switch (varActivatedPath) {

      case 'list':
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomerListComponent);
        this.ComponentFDirective.viewContainerRef.clear();
        this.ComponentFDirective.viewContainerRef.createComponent(componentFactory);
        break;
      case 'create':
        var componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(CustomerCreateComponent);
        this.ComponentFDirective.viewContainerRef.clear();
        this.ComponentFDirective.viewContainerRef.createComponent(componentFactory2);
        break;
    }
  }
}
