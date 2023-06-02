import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleclientComponent } from './singleclient.component';

describe('SingleclientComponent', () => {
  let component: SingleclientComponent;
  let fixture: ComponentFixture<SingleclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
