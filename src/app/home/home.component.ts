import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MasterService } from '../services/master.service';
import { Cluster } from '../models/cluster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[MasterService]
})
export class HomeComponent implements OnInit {
  sidebarOpened = true;
  screenWidth: any;

  headerVisibility:boolean = true

  constructor(private masterService:MasterService, ) {
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
