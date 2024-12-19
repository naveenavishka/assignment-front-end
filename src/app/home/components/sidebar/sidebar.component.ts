import { Component, OnInit } from '@angular/core';
import { LUser } from 'src/app/models/LUser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  user:LUser

  ngOnInit(): void {
    this.user = <LUser>JSON.parse(localStorage.getItem('currentUser')||"");

    console.log(this.user)
  }
}
