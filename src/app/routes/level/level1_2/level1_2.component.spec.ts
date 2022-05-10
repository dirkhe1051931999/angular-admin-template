/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Level1_2Component } from './level1_2.component';

describe('Level1_2Component', () => {
  let component: Level1_2Component;
  let fixture: ComponentFixture<Level1_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level1_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
