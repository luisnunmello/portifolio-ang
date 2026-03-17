import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarHabilidadeComponent } from './criar-habilidade.component';

describe('CriarHabilidadeComponent', () => {
  let component: CriarHabilidadeComponent;
  let fixture: ComponentFixture<CriarHabilidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarHabilidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarHabilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
