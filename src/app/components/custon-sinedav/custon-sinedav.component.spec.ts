import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustonSinedavComponent } from './custon-sinedav.component';

describe('CustonSinedavComponent', () => {
  let component: CustonSinedavComponent;
  let fixture: ComponentFixture<CustonSinedavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustonSinedavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustonSinedavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
