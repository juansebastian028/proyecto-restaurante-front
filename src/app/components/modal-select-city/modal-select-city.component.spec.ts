import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectCityComponent } from './modal-select-city.component';

describe('ModalSelectCityComponent', () => {
  let component: ModalSelectCityComponent;
  let fixture: ComponentFixture<ModalSelectCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
