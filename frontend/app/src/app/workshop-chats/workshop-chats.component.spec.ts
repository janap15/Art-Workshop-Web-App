import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopChatsComponent } from './workshop-chats.component';

describe('WorkshopChatsComponent', () => {
  let component: WorkshopChatsComponent;
  let fixture: ComponentFixture<WorkshopChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopChatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
