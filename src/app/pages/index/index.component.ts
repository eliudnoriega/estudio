import { Component, OnInit, OnDestroy } from '@angular/core';
import noUiSlider from 'nouislider';
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

    const slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    const slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });

    this.userService.auth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

}
