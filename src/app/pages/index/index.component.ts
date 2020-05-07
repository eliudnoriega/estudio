import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  currentUser: any;

  constructor(
    private userService: UserService
  ) { }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');

    this.userService.auth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

}
