import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewchambreComponent } from './newchambre.component';

describe('NewchambreComponent', () => {
  let component: NewchambreComponent;
  let fixture: ComponentFixture<NewchambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewchambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewchambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
