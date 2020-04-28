import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CdkPortal, PortalHostDirective, TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent implements OnInit {

  @ViewChild(CdkPortal, {static: true})
  templatePortal: TemplatePortal;

  @ViewChild(PortalHostDirective, {static: true})
  host: PortalHostDirective;

  @Input()
  isNotHome = false;

  constructor() {
  }

  ngOnInit(): void {
    this.host.attachTemplatePortal(this.templatePortal);
  }

}
