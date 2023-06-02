import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleemployerComponent } from './singleemployer.component';

describe('SingleemployerComponent', () => {
  let component: SingleemployerComponent;
  let fixture: ComponentFixture<SingleemployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleemployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleemployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
