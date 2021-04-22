import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShoppingCartComponent } from './modal-shopping-cart.component';

describe('ModalShoppingCartComponent', () => {
  let component: ModalShoppingCartComponent;
  let fixture: ComponentFixture<ModalShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalShoppingCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
