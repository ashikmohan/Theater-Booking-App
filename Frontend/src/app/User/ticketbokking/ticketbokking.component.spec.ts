import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketbokkingComponent } from './ticketbokking.component';

describe('TicketbokkingComponent', () => {
  let component: TicketbokkingComponent;
  let fixture: ComponentFixture<TicketbokkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketbokkingComponent]
    });
    fixture = TestBed.createComponent(TicketbokkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
