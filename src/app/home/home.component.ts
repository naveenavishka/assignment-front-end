import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sidebarOpened = true;
  screenWidth: any;

  headerVisibility:boolean = true

  constructor() {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  sideBarToggler(event:any) {
    console.log("eited")
    this.sidebarOpened = !this.sidebarOpened;

    console.log(this.sidebarOpened)
  }

  sideBarToggleFromLink(event:any) {
    if (this.screenWidth <= 800) {
      this.sidebarOpened = event;
    }
  }


}
