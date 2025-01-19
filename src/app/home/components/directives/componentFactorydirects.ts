import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[componentfactoryDirectives]',
})
export class ComponentFactoryDirectives {
  constructor(public viewContainerRef: ViewContainerRef) {}
}