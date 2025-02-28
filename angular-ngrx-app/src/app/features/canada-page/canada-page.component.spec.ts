import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanadaPageComponent } from './canada-page.component';

describe('CanadaPageComponent', () => {
  let component: CanadaPageComponent;
  let fixture: ComponentFixture<CanadaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanadaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanadaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
