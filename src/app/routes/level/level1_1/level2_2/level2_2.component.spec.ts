/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Level2_2Component } from './level2_2.component';

describe('Level2_2Component', () => {
  let component: Level2_2Component;
  let fixture: ComponentFixture<Level2_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
