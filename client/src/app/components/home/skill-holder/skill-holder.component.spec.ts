import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillHolderComponent } from './skill-holder.component';

describe('SkillHolderComponent', () => {
  let component: SkillHolderComponent;
  let fixture: ComponentFixture<SkillHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
