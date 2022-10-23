import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCodeComponent } from './auth-code.component';

describe('AutoCodeComponent', () => {
  let component: AutoCodeComponent;
  let fixture: ComponentFixture<AutoCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
