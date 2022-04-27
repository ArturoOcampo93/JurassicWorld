import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribeComponent } from './escribe.component';

describe('EscribeComponent', () => {
  let component: EscribeComponent;
  let fixture: ComponentFixture<EscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
