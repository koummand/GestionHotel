import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProduitComponent } from './single-produit.component';

describe('SingleProduitComponent', () => {
  let component: SingleProduitComponent;
  let fixture: ComponentFixture<SingleProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
