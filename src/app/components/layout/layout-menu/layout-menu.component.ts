import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.scss']
})
export class LayoutMenuComponent implements OnInit {

  @Input()
  toBack = false;

  isCollapsed = true;
  currentUser: any;

  constructor(
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.auth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.userService.logout();
  }

}
