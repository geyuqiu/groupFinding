import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingComponent } from './greeting.component';
import { GreetingService } from '../../services/greeting.service';
import { of } from 'rxjs';

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;
  let greetingServiceMock = {
    fetch: jasmine.createSpy().and.returnValue(of(''))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetingComponent ],
      providers: [
        {provide: GreetingService, useValue: greetingServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
