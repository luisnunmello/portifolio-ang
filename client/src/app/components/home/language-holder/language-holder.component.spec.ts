import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageHolderComponent } from './language-holder.component';

describe('LanguageHolderComponent', () => {
  let component: LanguageHolderComponent;
  let fixture: ComponentFixture<LanguageHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
