import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ComponentFactoryDirectives } from '../components/directives/componentFactorydirects';
import { ProductListComponent } from 'src/app/features/product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { ProductCreateComponent } from 'src/app/features/product-create/product-create.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductListComponent);
        this.ComponentFDirective.viewContainerRef.clear();
        this.ComponentFDirective.viewContainerRef.createComponent(componentFactory);
        break;
      case 'create':
        var componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(ProductCreateComponent);
        this.ComponentFDirective.viewContainerRef.clear();
        this.ComponentFDirective.viewContainerRef.createComponent(componentFactory2);
        break;
    }
  }
}
