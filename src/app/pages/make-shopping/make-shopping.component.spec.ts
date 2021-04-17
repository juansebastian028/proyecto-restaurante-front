import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeShoppingComponent } from './make-shopping.component';

describe('MakeShoppingComponent', () => {
  let component: MakeShoppingComponent;
  let fixture: ComponentFixture<MakeShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
