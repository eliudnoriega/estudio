import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'estudio';
  currentUser: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.userService.auth.authState.subscribe(user => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['login']);
      }
    });
  }

  logout(): void {
    this.userService.logout();
  }

}
