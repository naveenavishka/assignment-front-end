import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() headerVisibility: string
  @Output() toggleSideBarEmitter: EventEmitter<any> = new EventEmitter();


  userDisplayName: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userDisplayName = JSON.parse(localStorage.getItem('currentUser') || '{}').varUserName;

    
  }

  toggleSideBar() {
    this.toggleSideBarEmitter.emit();

  }

  onSignout() {

    localStorage.clear();
    this.router.navigate(['login']);
  }
}
