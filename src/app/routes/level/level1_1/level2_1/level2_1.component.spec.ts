/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Level2_1Component } from './level2_1.component';

describe('Level2_1Component', () => {
  let component: Level2_1Component;
  let fixture: ComponentFixture<Level2_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
