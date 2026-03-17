import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageCardComponent } from './admin-page-card.component';

describe('AdminPageCardComponent', () => {
  let component: AdminPageCardComponent;
  let fixture: ComponentFixture<AdminPageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
