import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ComponentFactoryDirectives } from '../components/directives/componentFactorydirects';
import { ActivatedRoute } from '@angular/router';
import { PosUiComponent } from 'src/app/features/pos-ui/pos-ui.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
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

      case 'pos':
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(PosUiComponent);
        this.ComponentFDirective.viewContainerRef.clear();
        this.ComponentFDirective.viewContainerRef.createComponent(componentFactory);
        break;
      // case 'create':
      //   var componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(ProductCreateComponent);
      //   this.ComponentFDirective.viewContainerRef.clear();
      //   this.ComponentFDirective.viewContainerRef.createComponent(componentFactory2);
      //   break;
    }
  }
}
