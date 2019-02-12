import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadEstudianteComponent } from './actividad-estudiante.component';

describe('ActividadEstudianteComponent', () => {
  let component: ActividadEstudianteComponent;
  let fixture: ComponentFixture<ActividadEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
