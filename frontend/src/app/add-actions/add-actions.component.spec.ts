import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionsComponent } from './add-actions.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddActionsComponent', () => {
  let component: AddActionsComponent;
  let fixture: ComponentFixture<AddActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActionsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
