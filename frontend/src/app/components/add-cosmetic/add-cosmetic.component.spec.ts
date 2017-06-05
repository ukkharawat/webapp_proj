/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCosmeticComponent } from './add-cosmetic.component';

describe('AddCosmeticComponent', () => {
  let component: AddCosmeticComponent;
  let fixture: ComponentFixture<AddCosmeticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCosmeticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCosmeticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
