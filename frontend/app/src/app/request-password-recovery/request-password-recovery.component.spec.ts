import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasswordRecoveryComponent } from './request-password-recovery.component';

describe('RequestPasswordRecoveryComponent', () => {
  let component: RequestPasswordRecoveryComponent;
  let fixture: ComponentFixture<RequestPasswordRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPasswordRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
