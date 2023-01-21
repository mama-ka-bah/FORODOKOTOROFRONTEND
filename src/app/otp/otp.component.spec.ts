import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { OtpComponent } from './otp.component';

describe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpComponent ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
