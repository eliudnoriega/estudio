import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-custon-sinedav',
  templateUrl: './custon-sinedav.component.html',
  styleUrls: ['./custon-sinedav.component.scss']
})
export class CustonSinedavComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  goToSurvey(): void {
    this.router.navigate(['surveyEdit', 0]);
  }

}
