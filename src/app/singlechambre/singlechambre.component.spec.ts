import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglechambreComponent } from './singlechambre.component';

describe('SinglechambreComponent', () => {
  let component: SinglechambreComponent;
  let fixture: ComponentFixture<SinglechambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglechambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglechambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
